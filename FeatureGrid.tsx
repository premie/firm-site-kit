export type Feature = { title: string; text: string; icon?: { src: string; alt?: string } | null }

/** Reasons to choose the firm: 2 by 2 on desktop with icons in dark circles, a compact icon list on phones. Icons are
 * shown at 36px on the site's darkest color: fine line art faded out at 28px on a pale tint. */
export function FeatureGrid({ items, className = '' }: { items: Feature[]; className?: string }) {
  return (
    <ul className={`not-prose grid gap-5 md:grid-cols-2 md:gap-6 ${className}`}>
      {items.map((f) => (
        <li key={f.title} className="flex gap-4 md:flex-col md:rounded-2xl md:border md:border-mist md:bg-white md:p-7 md:shadow-sm">
          {f.icon && (
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink md:h-16 md:w-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.icon.src} alt={f.icon.alt ?? ''} width={36} height={36} loading="lazy" className="h-8 w-8 md:h-9 md:w-9" />
            </span>
          )}
          <div>
            <h3 className="font-semibold text-ink md:text-lg">{f.title}</h3>
            <p className="mt-1 leading-relaxed text-graphite">{f.text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
