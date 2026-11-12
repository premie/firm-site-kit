export type Review = {
  /** The client's words, verbatim. */
  text: string
  /** Name or initials, as the firm publishes them. */
  author: string
  /** Optional second line under the name, e.g. "Traffic ticket, Dallas". */
  detail?: string
  /** 1 to 5, only when the source gave one. No rating = no stars. */
  rating?: number
  /** Where the review was left, e.g. "Google". Only when known. */
  source?: string
}

export type ReviewAggregate = { rating: number; count: number; href?: string; source?: string }
