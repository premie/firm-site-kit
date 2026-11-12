import { LiteYouTube } from './LiteYouTube.tsx'
import { ReviewCard } from './ReviewCard.tsx'
import { Stars } from './Stars.tsx'
import type { Review, ReviewAggregate } from './types.ts'

const DISCLAIMER = 'These are individual client experiences. Past results do not guarantee a similar outcome; every case depends on its own facts.'

/**
 * Client reviews: heading, the firm's aggregate rating when it has one, an optional video, then the reviews as
 * equal-height cards (3 across on desktop) or a swipe carousel on phones. Ported from conduit.law's FeaturedReviews.
 * align="center" centers the heading, the cards (a short last row sits in the middle) and the footer.
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
  align = 'start',
}: {
  heading?: string
  intro?: string
  reviews: Review[]
  aggregate?: ReviewAggregate | null
  allHref?: string
  allLabel?: string
  video?: { id: string; title: string; cropLetterbox?: boolean } | null
  disclaimer?: string
  align?: 'start' | 'center'
}) {
  if (!reviews.length) return null
  const center = align === 'center'
  return (
    <section className="not-prose" aria-labelledby="reviews-heading">
      <div className={center ? 'flex flex-col items-center gap-4 text-center' : 'flex flex-col gap-4 md:flex-row md:items-end md:justify-between'}>
        <div>
          <h2 id="reviews-heading" className="font-serif text-3xl text-ink md:text-4xl">
            {heading}
          </h2>
          {intro && <p className={`mt-3 max-w-2xl text-graphite ${center ? 'mx-auto' : ''}`}>{intro}</p>}
        </div>
        {aggregate && aggregate.count > 0 && !video && (
          <a href={aggregate.href} rel="noopener" target="_blank" className="flex items-center gap-2 text-sm text-graphite hover:text-ink" data-event="reviews_aggregate">
            <Stars rating={aggregate.rating} />
            <span className="font-semibold text-ink">
              {aggregate.count.toLocaleString('en-US')} {aggregate.source ?? ''} reviews
            </span>
            <span>({aggregate.rating.toFixed(1)})</span>
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
              {/* The volume of reviews leads; the average sits under it, small. */}
              <span className="font-serif text-6xl leading-none">{aggregate.count.toLocaleString('en-US')}</span>
              <span className="mt-2 text-lg text-paper">{aggregate.source ? `${aggregate.source} reviews` : 'reviews'}</span>
              <span className="mt-4 flex items-center gap-2 text-sm text-paper/80">
                <Stars rating={aggregate.rating} className="h-4 w-4" />
                {aggregate.rating.toFixed(1)} average
              </span>
              <span className="mt-6 text-sm font-semibold text-teal">Read them on {aggregate.source ?? 'the source'} →</span>
            </a>
          )}
        </div>
      )}

      <ul
        className={`-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:gap-6 md:overflow-visible md:px-0 md:pb-0 ${
          center ? 'md:flex-wrap md:justify-center' : 'md:grid md:grid-cols-3'
        }`}
      >
        {reviews.map((r) => (
          <li key={r.author + r.text.slice(0, 24)} className={`w-[85%] shrink-0 snap-center ${center ? 'md:w-[calc((100%-3rem)/3)]' : 'md:w-auto'}`}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      <div className={center ? 'mt-8 flex flex-col items-center gap-4 text-center' : 'mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'}>
        <p className="max-w-3xl text-xs leading-relaxed text-graphite">{disclaimer}</p>
        {allHref && (
          <a href={allHref} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-[10px] border-2 border-deep-teal px-5 font-semibold text-ink transition hover:bg-deep-teal/10" data-event="reviews_all">
            {allLabel}
          </a>
        )}
      </div>
    </section>
  )
}
