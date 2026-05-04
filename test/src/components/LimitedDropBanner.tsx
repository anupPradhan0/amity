import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function LimitedDropBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    // Fake future date: June 1, 2025
    const targetDate = new Date('2025-06-01T00:00:00').getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-stripes py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden" aria-label="Limited Drop Banner">
      <div className="max-w-5xl mx-auto w-full text-center relative z-10">
        <div className="bg-white border-8 border-deep p-6 md:p-10 lg:p-14 shadow-[12px_12px_0px_0px_rgba(13,27,42,1)] relative transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          {/* Decorative Corner Labels */}
          <div className="absolute top-0 left-0 bg-deep text-white font-display font-black uppercase text-xs tracking-[0.2em] px-3 py-1.5 hidden sm:block">
            WARNING
          </div>
          <div className="absolute bottom-0 right-0 bg-yellow text-deep font-display font-black uppercase text-xs tracking-[0.2em] px-3 py-1.5 border-l-4 border-t-4 border-deep hidden sm:block">
            DO NOT MISS
          </div>

          <h2 className="text-deep font-display font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none mb-8 mix-blend-multiply">
            TIME IS <br className="md:hidden" />RUNNING OUT
          </h2>

          {/* Countdown Timer */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-10" aria-label="Countdown timer">
            {Object.entries(timeLeft).map(([label, value], i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.span 
                    key={value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-display font-black text-5xl md:text-7xl text-deep tabular-nums leading-none bg-surface border-4 border-deep px-3 py-4 shadow-[6px_6px_0px_0px_rgba(245,197,24,1)]"
                  >
                    {value}
                  </motion.span>
                  <span className="text-deep font-black text-sm uppercase tracking-[0.2em] mt-4 bg-yellow px-2 py-0.5 border-2 border-deep">
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <span className="text-deep font-black text-5xl md:text-7xl ml-4 sm:ml-8 -mt-12 animate-pulse hidden sm:inline-block">
                    :
                  </span>
                )}
              </div>
            ))}
          </div>

          <Button variant="deep" size="lg" className="w-full md:w-auto h-16 px-12 font-display font-black uppercase tracking-widest text-xl md:text-2xl shadow-[6px_6px_0px_0px_rgba(245,197,24,1)] hover:shadow-[12px_12px_0px_0px_rgba(245,197,24,1)]">
            SECURE YOURS NOW
          </Button>
        </div>
      </div>
    </section>
  )
}
