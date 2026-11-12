'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { Stars } from './Stars.tsx'
import type { Review } from './types.ts'

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z .]/g, '')
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('')

/** One review, quoted verbatim. Long ones are clamped to 5 lines; Read more appears only when something is cut. */
export function ReviewCard({ review, className = '' }: { review: Review; className?: string }) {
  const quote = useRef<HTMLQuoteElement>(null)
  const [open, setOpen] = useState(false)
  const [clamped, setClamped] = useState(false)
  useLayoutEffect(() => {
    const el = quote.current
    if (el && !open) setClamped(el.scrollHeight > el.clientHeight + 1)
  }, [open, review.text])
  return (
    <figure className={`flex h-full flex-col rounded-2xl border border-mist bg-white p-6 shadow-sm ${className}`}>
      {typeof review.rating === 'number' && <Stars rating={review.rating} />}
      <blockquote ref={quote} className={`mt-3 flex-1 text-base leading-relaxed text-graphite ${open ? '' : 'line-clamp-5'}`}>
        &ldquo;{review.text}&rdquo;
      </blockquote>
      {(clamped || open) && (
        <button type="button" onClick={() => setOpen(!open)} className="mt-2 self-start text-sm font-semibold text-deep-teal hover:underline" aria-expanded={open}>
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
      <figcaption className="mt-5 flex items-center gap-3 border-t border-mist pt-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-paper" aria-hidden>
          {initials(review.author) || '?'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-ink">{review.author}</span>
          {review.detail && <span className="block truncate text-sm text-graphite">{review.detail}</span>}
        </span>
        {review.source && <span className="text-xs font-medium uppercase tracking-wide text-graphite">{review.source}</span>}
      </figcaption>
    </figure>
  )
}
