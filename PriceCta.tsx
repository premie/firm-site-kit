/**
 * A self-serve price call to action (e.g. a traffic ticket sign-up): eyebrow, heading, one line, ticked reasons, a
 * primary button and an optional phone link. Dark card with a brass rule, for the top of a service page.
 */
export function PriceCta({
  eyebrow,
  heading,
  text,
  points = [],
  href,
  label,
  phone,
  className = '',
}: {
  eyebrow?: string
  heading: string
  text?: string
  points?: string[]
  href: string
  label: string
  phone?: { display: string; tel: string }
  className?: string
}) {
  return (
    <aside className={`not-prose rounded-2xl border-t-4 border-brass bg-ink p-6 text-paper shadow-sm sm:p-8 ${className}`}>
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brass">{eyebrow}</p>}
      <p className="mt-2 font-serif text-2xl leading-tight sm:text-3xl">{heading}</p>
      {text && <p className="mt-3 leading-relaxed text-paper/85">{text}</p>}
      {points.length > 0 && (
        <ul className="mt-4 grid gap-2 text-sm text-paper/90 sm:grid-cols-3">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="text-teal" aria-hidden>
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a href={href} className="btn-primary" data-event="price_cta">
          {label}
        </a>
        {phone && (
          <a href={`tel:${phone.tel}`} className="btn-outline" data-event="price_cta_call">
            Call {phone.display}
          </a>
        )}
      </div>
    </aside>
  )
}
