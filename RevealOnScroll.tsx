'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Fades matching elements up 12px over 400ms as they scroll into view. Renders nothing. Content is visible without
 * JavaScript and for reduced-motion users: the hidden state is only added here, just before observing.
 * Pair with the CSS in tokens.css (.reveal-pending / .reveal-in).
 */
export function RevealOnScroll({ selector }: { selector: string }) {
  const pathname = usePathname()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const els = [...document.querySelectorAll<HTMLElement>(selector)].filter((el) => el.getBoundingClientRect().top > window.innerHeight)
    els.forEach((el) => el.classList.add('reveal-pending'))
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('reveal-in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [selector, pathname])
  return null
}
