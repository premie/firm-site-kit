export type Step = { title: string; text: string; image?: { src: string; alt?: string } | null }

/**
 * Numbered steps. Desktop: side by side, joined by a line through brass-ringed numbers. Phones: a vertical timeline.
 * Images are cropped to the same 4:3 so mixed sources line up.
 */
export function StepsTimeline({ steps, className = '' }: { steps: Step[]; className?: string }) {
  return (
    <ol className={`not-prose relative grid gap-10 md:grid-cols-3 md:gap-8 ${className}`}>
      <span className="absolute left-6 top-6 bottom-6 w-px bg-brass/40 md:left-[16.66%] md:right-[16.66%] md:top-6 md:bottom-auto md:h-px md:w-auto" aria-hidden />
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-5 md:flex-col md:items-center md:text-center">
          <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-brass bg-paper font-serif text-xl text-ink">{i + 1}</span>
          {/* Text grows, the image sits at the bottom: images line up across steps whatever the text length. */}
          <div className="flex flex-1 flex-col md:mt-5 md:w-full">
            <h3 className="font-semibold text-ink md:text-lg">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-graphite md:mb-5">{s.text}</p>
            {s.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.image.src} alt={s.image.alt ?? ''} loading="lazy" className="mt-5 aspect-[4/3] w-full rounded-xl object-cover md:mt-auto md:pt-0" />
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
