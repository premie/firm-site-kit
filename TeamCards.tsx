export type TeamMember = { name: string; role: string; href?: string; image?: { src: string; alt?: string } | null }

/** The people at the firm as cards: photo (or initials), name, role, a link to their page. 2 across on tablets, 4 on desktop. */
export function TeamCards({ people, className = '' }: { people: TeamMember[]; className?: string }) {
  const initials = (n: string) =>
    n
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  return (
    <ul className={`not-prose grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {people.map((p) => {
        const body = (
          <>
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-ink">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image.src} alt={p.image.alt || p.name} loading="lazy" className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]" />
              ) : (
                <span className="grid h-full w-full place-items-center font-serif text-5xl text-teal" aria-hidden>
                  {initials(p.name)}
                </span>
              )}
            </div>
            <span className="mt-4 block font-serif text-xl text-ink">{p.name}</span>
            <span className="mt-1 block text-sm text-graphite">{p.role}</span>
          </>
        )
        return (
          <li key={p.name}>
            {p.href ? (
              <a href={p.href} className="group block">
                {body}
              </a>
            ) : (
              body
            )}
          </li>
        )
      })}
    </ul>
  )
}
