'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export type ExitOffer = {
  eyebrow?: string
  title: string
  body: string
  primary: { label: string; href: string }
  /** Optional call line under the primary button. */
  call?: { label: string; tel: string } | null
  /** One reassurance line at the bottom, e.g. "Free, confidential consultation". */
  trust?: string
}

/** First rule whose `match` substring is in the path wins; otherwise `fallback`. */
export type ExitRule = { match: string; offer: ExitOffer }

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const track = (event: string, data: Record<string, unknown>) => {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...data })
  } catch {}
}

/**
 * Exit-intent offer, ported from conduit.law. Desktop only: opens when the mouse leaves through the top of the
 * window, after 2 seconds on the page, once per session. No phone trigger: the back-button variant is a
 * deceptive-UX signal to Google and was removed on conduit.law. Focus is trapped while open, Escape closes it,
 * and every open/click/dismiss is pushed to the dataLayer (exit_popup_*).
 */
export function ExitIntentPopup({
  rules = [],
  fallback,
  excludePaths = [],
  excludePrefixes = [],
  storageKey = 'exit-popup-shown',
  variant = 'default',
}: {
  rules?: ExitRule[]
  fallback: ExitOffer
  excludePaths?: string[]
  excludePrefixes?: string[]
  storageKey?: string
  variant?: string
}) {
  const pathname = usePathname() || '/'
  const [open, setOpen] = useState(false)
  const triggered = useRef(false)
  const modal = useRef<HTMLDivElement>(null)
  const previous = useRef<HTMLElement | null>(null)
  const excluded = excludePaths.includes(pathname) || excludePrefixes.some((p) => pathname.startsWith(p))
  const offer = rules.find((r) => pathname.includes(r.match))?.offer ?? fallback

  const show = useCallback(() => {
    if (triggered.current) return
    try {
      if (sessionStorage.getItem(storageKey)) return
      sessionStorage.setItem(storageKey, '1')
    } catch {}
    triggered.current = true
    setOpen(true)
    track('exit_popup_shown', { popup_variant: variant, popup_title: offer.title })
  }, [storageKey, variant, offer.title])

  const close = useCallback(
    (method: string | null) => {
      if (method) track('exit_popup_dismiss', { method, popup_variant: variant })
      setOpen(false)
      previous.current?.focus()
    },
    [variant],
  )

  useEffect(() => {
    if (excluded) return
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show()
    }
    const t = setTimeout(() => document.addEventListener('mouseleave', onLeave), 2000)
    return () => {
      clearTimeout(t)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [excluded, show])

  useEffect(() => {
    if (!open || !modal.current) return
    previous.current = document.activeElement as HTMLElement
    const els = modal.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const first = els[0]
    const last = els[els.length - 1]
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close('escape')
      if (e.key !== 'Tab') return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="exit-popup-title">
      <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={() => close('overlay')} aria-hidden />
      <div ref={modal} className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button type="button" onClick={() => close('close_button')} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full text-graphite hover:bg-paper" aria-label="Close">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="border-t-4 border-brass px-7 pb-4 pt-9 text-center">
          {offer.eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-deep-teal">{offer.eyebrow}</p>}
          <h2 id="exit-popup-title" className="font-serif text-2xl leading-snug text-ink md:text-3xl">
            {offer.title}
          </h2>
          <p className="mt-3 leading-relaxed text-graphite">{offer.body}</p>
        </div>
        <div className="space-y-2 px-7 pb-6">
          <a
            href={offer.primary.href}
            onClick={() => {
              track('exit_popup_click', { cta: 'primary', destination: offer.primary.href, popup_variant: variant })
              close(null)
            }}
            className="flex min-h-12 w-full items-center justify-center rounded-[10px] bg-teal px-6 text-lg font-semibold text-ink transition hover:bg-teal/85 active:scale-[0.98]"
          >
            {offer.primary.label}
          </a>
          {offer.call && (
            <a
              href={`tel:${offer.call.tel}`}
              onClick={() => {
                track('exit_popup_click', { cta: 'call', destination: `tel:${offer.call!.tel}`, popup_variant: variant })
                close(null)
              }}
              className="flex min-h-11 w-full items-center justify-center gap-2 font-semibold text-ink underline-offset-4 hover:underline"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {offer.call.label}
            </a>
          )}
        </div>
        {offer.trust && <p className="border-t border-mist px-7 py-4 text-center text-sm text-graphite">{offer.trust}</p>}
      </div>
    </div>
  )
}
