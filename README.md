# firm-site-kit

Shared section components for law-firm websites. Built from what conduit.law already proved, generalized
so any firm site can use it.

Used as a git submodule, like `premie/shared-quiz`:

```bash
git submodule add https://github.com/premie/firm-site-kit.git src/kit
```

## Rules

1. **Presentational only.** Data comes in through props. No site config, no fetches, no env vars, no
   firm names in the kit. A site's own adapter turns its data into props.
2. **Tokens, not colors.** Components use the theme color names `ink` (dark surface), `paper` (light
   surface), `teal` (action on dark), `deep-teal` (link/action on light), `brass` (accent), `mist`
   (hairlines), `graphite` (body text on light). Each site defines them (`tokens.css` shows the
   contract). Works with Tailwind 3 (theme.extend.colors) and 4 (`@theme`).
3. **Tailwind must scan the kit.** Tailwind 4: `@source "../kit";` in the site's globals.css.
   Tailwind 3: add `./src/kit/**/*.tsx` to `content`.
4. **Advertising rules are built in.** No invented ratings, sources or stars (a review shows stars only
   when it has a rating). Testimonials carry a results disclaimer. No em dashes in copy.
5. **Mobile first.** Every section is checked at 390px and 1440px before it lands here.

## Components

| Component | What |
|---|---|
| `Stars` | 0 to 5 stars, labelled for screen readers |
| `LiteYouTube` | Thumbnail + play button; loads the YouTube iframe only on click |
| `ReviewCard` | One review: optional stars, quote clamped to 5 lines with Read more, author avatar + detail, optional source |
| `StatsBand` | Numbers that count up on scroll (static under reduced motion), suffix in brass; 2x2 on phones, 4 across on desktop |
| `PracticeCards` | Dark cards: icon, title, line, text link pinned to the bottom; hover lift + brass top edge |
| `FeatureGrid` | Reasons to choose the firm: 2x2 cards with tinted icon circles on desktop, an icon list on phones |
| `StepsTimeline` | Numbered steps in brass rings joined by a line (across on desktop, down on phones), 4:3 images |
| `MobileCallBar` | Phones only: sticky Call + Consult bar, safe-area padded |
| `ExitIntentPopup` | Desktop exit-intent offer (mouse leaves through the top, once per session, no phone trigger); per-page offers as data rules; focus trap; dataLayer events |
| `RevealOnScroll` | Fades sections/cards up as they enter the viewport; no-JS and reduced-motion safe (CSS in tokens.css) |
| `ResultsStrip` | Past case results as cards (outcome, charge, court), with a disclaimer and a link to the full list |
| `PriceCta` | A self-serve price call to action (e.g. traffic ticket sign-up): heading, reasons, button, optional phone |
| `ReviewsSection` | Heading, optional aggregate (rating + count + link), optional video, equal-height grid (desktop) / snap carousel (phones), disclaimer |
