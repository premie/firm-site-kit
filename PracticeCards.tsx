export type PracticeCard = { title: string; href: string; text: string; icon?: { src: string; alt?: string } | null }

/** Practice areas as dark cards: icon, title, a short line, and a text link pinned to the bottom. */
export function PracticeCards({ items, className = '' }: { items: PracticeCard[]; className?: string }) {
  return (
    <ul className={`not-prose grid gap-6 md:grid-cols-3 ${className}`}>
      {items.map((c) => (
        <li key={c.href}>
          <a
            href={c.href}
            className="group flex h-full flex-col rounded-2xl border-t-2 border-transparent bg-ink p-7 text-paper shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brass hover:shadow-lg"
          >
            {c.icon && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.icon.src} alt={c.icon.alt ?? ''} width={48} height={48} loading="lazy" className="h-12 w-auto self-start transition group-hover:scale-105" />
            )}
            <span className="mt-5 font-serif text-2xl">{c.title}</span>
            <span className="mt-3 flex-1 leading-relaxed text-paper/80">{c.text}</span>
            <span className="mt-6 text-sm font-semibold text-teal">
              {c.title} <span className="inline-block transition group-hover:translate-x-1">→</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
