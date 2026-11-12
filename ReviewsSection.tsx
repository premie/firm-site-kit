import { LiteYouTube } from './LiteYouTube.tsx'
import { ReviewCard } from './ReviewCard.tsx'
import { Stars } from './Stars.tsx'
import type { Review, ReviewAggregate } from './types.ts'

const DISCLAIMER = 'These are individual client experiences. Past results do not guarantee a similar outcome; every case depends on its own facts.'

/**
 * Client reviews: heading, the firm's aggregate rating when it has one, an optional video, then the reviews as
 * equal-height cards (3 across on desktop) or a swipe carousel on phones. Ported from conduit.law's FeaturedReviews.
 */
export function ReviewsSection({
  heading = 'What Our Clients Say',
  intro,
  reviews,
  aggregate,
  allHref,
  allLabel = 'Read all reviews',
  video,
  disclaimer = DISCLAIMER,
}: {
  heading?: string
  intro?: string
  reviews: Review[]
  aggregate?: ReviewAggregate | null
  allHref?: string
  allLabel?: string
  video?: { id: string; title: string; cropLetterbox?: boolean } | null
  disclaimer?: string
}) {
  if (!reviews.length) return null
  return (
    <section className="not-prose" aria-labelledby="reviews-heading">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 id="reviews-heading" className="font-serif text-3xl text-ink md:text-4xl">
            {heading}
          </h2>
          {intro && <p className="mt-3 max-w-2xl text-graphite">{intro}</p>}
        </div>
        {aggregate && aggregate.count > 0 && !video && (
          <a href={aggregate.href} rel="noopener" target="_blank" className="flex items-center gap-2 text-sm text-graphite hover:text-ink" data-event="reviews_aggregate">
            <Stars rating={aggregate.rating} />
            <span className="font-semibold text-ink">{aggregate.rating.toFixed(1)}</span>
            <span>
              from {aggregate.count} {aggregate.source ?? ''} reviews
            </span>
          </a>
        )}
      </div>

      {video && (
        // With a video: the video (two thirds) beside the rating card (one third) on desktop; stacked on phones.
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <LiteYouTube videoId={video.id} title={video.title} cropLetterbox={video.cropLetterbox} />
          </div>
          {aggregate && aggregate.count > 0 && (
            <a
              href={aggregate.href}
              rel="noopener"
              target="_blank"
              data-event="reviews_aggregate"
              className="flex flex-col justify-center rounded-2xl bg-ink p-8 text-paper transition hover:bg-ink/95"
            >
              <span className="font-serif text-6xl leading-none">{aggregate.rating.toFixed(1)}</span>
              <span className="mt-3">
                <Stars rating={aggregate.rating} className="h-6 w-6" />
              </span>
              <span className="mt-3 text-paper/80">
                from {aggregate.count} {aggregate.source ?? ''} reviews
              </span>
              <span className="mt-6 text-sm font-semibold text-teal">Read them on {aggregate.source ?? 'the source'} →</span>
            </a>
          )}
        </div>
      )}

      <ul className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {reviews.map((r) => (
          <li key={r.author + r.text.slice(0, 24)} className="w-[85%] shrink-0 snap-center md:w-auto">
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-3xl text-xs leading-relaxed text-graphite/80">{disclaimer}</p>
        {allHref && (
          <a href={allHref} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] border-2 border-deep-teal px-5 font-semibold text-ink transition hover:bg-deep-teal/10" data-event="reviews_all">
            {allLabel}
          </a>
        )}
      </div>
    </section>
  )
}
