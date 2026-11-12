'use client'

import { useEffect, useRef, useState } from 'react'

export type Stat = { value: number; suffix?: string; label: string }

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

/** A navy band of numbers that count up when scrolled into view (instantly for reduced-motion users). */
export function StatsBand({ stats, className = '' }: { stats: Stat[]; className?: string }) {
  const ref = useRef<HTMLDListElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setProgress(1)
      return
    }
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / 1200)
          setProgress(1 - Math.pow(1 - p, 3))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <dl ref={ref} className={`not-prose grid grid-cols-2 gap-x-4 gap-y-8 rounded-2xl bg-ink px-6 py-10 text-center md:grid-cols-4 md:px-10 ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse">
          <dt className="mt-2 text-sm text-paper/80 md:text-base">{s.label}</dt>
          <dd className="font-serif text-4xl leading-none text-paper md:text-5xl">
            {/* The final number is in the markup for crawlers and screen readers; the count-up is visual only. */}
            <span className="sr-only">
              {fmt(s.value)}
              {s.suffix}
            </span>
            <span aria-hidden>
              {fmt(s.value * (progress || 0))}
              {s.suffix && <span className="ml-0.5 align-top text-2xl text-brass md:text-3xl">{s.suffix}</span>}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
