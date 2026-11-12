export type Result = {
  /** The charge, as the firm published it, e.g. "DWI, breath test result of .17". */
  charge: string
  /** The outcome, as published, e.g. "Not guilty", "Dismissed", "Reduced to a Class A misdemeanor". */
  outcome: string
  /** Optional court or county line, e.g. "Dallas County". */
  court?: string
  /** Optional link to the published list the result comes from. */
  href?: string
}

/**
 * Past case results as cards: outcome first (it is what a reader scans for), then the charge and the court. 3 across
 * on desktop, a swipe row on phones. Always carries a disclaimer: results are published records, not promises.
 */
export function ResultsStrip({
  heading = 'Recent Case Results',
  intro,
  results,
  allHref,
  allLabel = 'See all case results',
  disclaimer = 'Past results do not guarantee a similar outcome. Every case depends on its own facts.',
  className = '',
}: {
  heading?: string
  intro?: string
  results: Result[]
  allHref?: string
  allLabel?: string
  disclaimer?: string
  className?: string
}) {
  if (!results.length) return null
  return (
    <section className={`not-prose ${className}`} aria-labelledby="results-heading">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 id="results-heading" className="font-serif text-3xl text-ink md:text-4xl">
          {heading}
        </h2>
        {intro && <p className="max-w-2xl text-graphite">{intro}</p>}
      </div>
      <ul className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {results.map((r) => (
          <li key={r.charge + r.outcome + (r.court ?? '')} className="w-[80%] shrink-0 snap-center md:w-auto">
            <div className="flex h-full flex-col rounded-2xl border-t-4 border-brass bg-ink p-6 text-paper shadow-sm">
              <span className="font-serif text-2xl text-teal">{r.outcome}</span>
              <span className="mt-2 flex-1 leading-relaxed text-paper">{r.charge}</span>
              {r.court && <span className="mt-4 text-sm text-paper/70">{r.court}</span>}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <p className="max-w-3xl text-xs leading-relaxed text-graphite">{disclaimer}</p>
        {allHref && (
          <a href={allHref} className="inline-flex min-h-12 items-center justify-center rounded-[10px] border-2 border-deep-teal px-5 font-semibold text-ink transition hover:bg-deep-teal/10" data-event="results_all">
            {allLabel}
          </a>
        )}
      </div>
    </section>
  )
}
