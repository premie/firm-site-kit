/**
 * Phones only: a bar pinned to the bottom with the two things a visitor came to do. The site must pad the page
 * bottom by the bar's height on small screens (e.g. pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0).
 */
export function MobileCallBar({ phone, consultHref, callLabel = 'Call Now', consultLabel = 'Free Consult' }: { phone: { tel: string }; consultHref: string; callLabel?: string; consultLabel?: string }) {
  const btn = 'inline-flex h-12 items-center justify-center rounded-[10px] font-semibold transition active:scale-[0.98]'
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-teal/20 bg-ink/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
      <a href={`tel:${phone.tel}`} data-event="call_sticky" className={`${btn} border-2 border-teal text-paper`}>
        {callLabel}
      </a>
      <a href={consultHref} data-event="cta_sticky" className={`${btn} bg-teal text-ink`}>
        {consultLabel}
      </a>
    </div>
  )
}
