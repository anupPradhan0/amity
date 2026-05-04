const TICKER_CONTENT =
  'AMITY MERCH \u00A0\u00A0✦\u00A0\u00A0 NEW DROP \u00A0\u00A0✦\u00A0\u00A0 LIMITED EDITION \u00A0\u00A0✦\u00A0\u00A0 CAMPUS EXCLUSIVE \u00A0\u00A0✦\u00A0\u00A0 NO CAP \u00A0\u00A0✦\u00A0\u00A0 '

export default function MarqueeTicker() {
  const repeated = TICKER_CONTENT.repeat(8)

  return (
    <div className="relative py-12 sm:py-16 bg-surface overflow-hidden flex flex-col items-center justify-center border-y-4 border-deep mt-8">
      {/* Top Tape - Yellow */}
      <div
        className="marquee-wrap absolute w-[110vw] bg-yellow py-3 sm:py-4 border-y-4 border-deep select-none flex shadow-xl z-20 top-4 sm:top-6"
        style={{ transform: 'rotate(-2deg)' }}
        aria-label="Promotional ticker"
        role="marquee"
      >
        <div className="marquee-track flex whitespace-nowrap will-change-transform">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-display font-black text-deep uppercase tracking-[0.1em] text-3xl sm:text-4xl shrink-0 px-4"
              style={{ WebkitTextStroke: '1px #0D1B2A' }}
              aria-hidden={i === 1}
            >
              {repeated}
            </span>
          ))}
        </div>
      </div>
      
      {/* Bottom Tape - Black */}
      <div
        className="marquee-wrap absolute w-[110vw] bg-deep py-3 sm:py-4 border-y-4 border-deep select-none flex shadow-xl z-10 bottom-4 sm:bottom-6"
        style={{ transform: 'rotate(-2deg)' }}
        aria-hidden="true"
      >
        <div className="marquee-track flex whitespace-nowrap will-change-transform" style={{ animationDirection: 'reverse' }}>
          {[0, 1].map((i) => (
            <span
              key={i}
              className="font-display font-black text-white uppercase tracking-[0.1em] text-3xl sm:text-4xl shrink-0 px-4"
              aria-hidden={i === 1}
            >
              {repeated}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
