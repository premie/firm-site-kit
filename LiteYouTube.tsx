'use client'

import { useState } from 'react'

/**
 * A YouTube video that costs nothing until it is played: the thumbnail and a play button, then the real
 * iframe on click (about 1.2 MB of YouTube JS/CSS saved on every page load). From conduit.law.
 */
/** cropLetterbox: the video itself has black bars (cinematic 2.39:1 in a 16:9 frame); zoom the thumbnail past them. */
export function LiteYouTube({ videoId, title = 'Video', className = '', cropLetterbox = false }: { videoId: string; title?: string; className?: string; cropLetterbox?: boolean }) {
  const [playing, setPlaying] = useState(false)
  if (playing) {
    return (
      <div className={`relative w-full overflow-hidden rounded-2xl bg-ink ${className}`} style={{ aspectRatio: '16 / 9' }}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-ink ${className}`}
      style={{ aspectRatio: '16 / 9' }}
      aria-label={`Play video: ${title}`}
      data-event="video_play"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {/* hq720 is 16:9 (hqdefault is 4:3 with black bars baked in); fall back when a video has no hq720. */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hq720.jpg`}
        onError={(e) => {
          const img = e.currentTarget
          if (!img.src.endsWith('/hqdefault.jpg')) img.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        }}
        alt=""
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover opacity-90 transition group-hover:opacity-100 ${cropLetterbox ? 'scale-[1.34]' : ''}`}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
      <span className="absolute inset-0 grid place-items-center" aria-hidden>
        <span className="grid h-16 w-16 place-items-center rounded-full bg-teal shadow-lg transition group-hover:scale-105">
          <svg className="ml-1 h-7 w-7 text-ink" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute bottom-4 left-4 right-4 text-left text-sm font-semibold text-paper">{title}</span>
    </button>
  )
}
