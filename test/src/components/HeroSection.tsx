import { motion, useReducedMotion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { FEATURED_HOODIE } from '@/lib/products'

const AVATAR_SEEDS = ['face1', 'face2', 'face3']

export default function HeroSection() {
  const shouldReduce = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotate: -2 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: { type: 'spring', damping: 15, stiffness: 100 }
    },
  }

  return (
    <section className="hero-mesh bg-noise min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden relative" aria-label="Hero section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-8 items-center">

          {/* LEFT — Content */}
            <motion.div 
            className="flex flex-col gap-8 max-w-2xl relative z-20"
            variants={shouldReduce ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={shouldReduce ? undefined : itemVariants}>
              <div className="inline-block bg-yellow text-deep font-display font-black uppercase text-sm tracking-widest py-2 px-5 border-4 border-deep shadow-[4px_4px_0px_0px_rgba(13,27,42,1)] -rotate-2">
                🔥 Drop 001 — Spring 2025
              </div>
            </motion.div>

            <motion.h1
              variants={shouldReduce ? undefined : itemVariants}
              className="font-display font-black text-white uppercase tracking-tighter leading-[0.85] relative"
              style={{ fontSize: 'clamp(4.5rem, 11vw, 8.5rem)' }}
            >
              <span className="block mb-2">Wear Your</span>
              <span className="block text-yellow relative z-10">Campus</span>
              <span className="block text-outline-white relative -mt-4 z-0">Pride</span>
            </motion.h1>

            <motion.p
              variants={shouldReduce ? undefined : itemVariants}
              className="text-white text-xl md:text-2xl font-bold leading-snug max-w-lg mt-4 bg-deep p-4 border-4 border-yellow shadow-[8px_8px_0px_0px_rgba(245,197,24,1)]"
            >
              Official Amity merch. Hoodies, tees, caps — designed for students, by students. No cap.
            </motion.p>

            <motion.div variants={shouldReduce ? undefined : itemVariants} className="flex flex-wrap items-center gap-6 mt-4">
              <Button variant="default" size="lg" className="group">
                Explore Collection
                <ArrowRight size={22} className="transition-transform group-hover:translate-x-2" strokeWidth={3} />
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={shouldReduce ? undefined : itemVariants} className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-4">
                {AVATAR_SEEDS.map((seed, i) => (
                  <img
                    key={seed}
                    src={`https://picsum.photos/seed/${seed}/80/80`}
                    alt="Student avatar"
                    width={56}
                    height={56}
                    loading="lazy"
                    className="w-14 h-14 rounded-none border-4 border-deep object-cover shadow-[4px_4px_0px_0px_rgba(13,27,42,1)]"
                    style={{ transform: `rotate(${i % 2 === 0 ? -4 : 6}deg)` }}
                  />
                ))}
              </div>
              <p className="text-white/90 font-bold bg-deep px-3 py-1 border-2 border-white/20 rotate-1">
                <span className="text-yellow font-black text-xl">1,2K+</span> students cop'd
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Floating product card */}
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, x: 100, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 80, delay: 0.6 }}
            className="flex justify-center lg:justify-end relative"
          >
            <div className="card-float relative w-full max-w-[460px]">
              {/* Back decorative box */}
              <div className="absolute inset-0 bg-yellow translate-x-4 translate-y-6 border-4 border-deep" />
              
              <div className="bg-white overflow-hidden relative z-10 border-4 border-deep shadow-[12px_12px_0px_0px_rgba(13,27,42,1)] group">
                {/* Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-surface border-b-4 border-deep">
                  <img
                    src={FEATURED_HOODIE.image}
                    alt={FEATURED_HOODIE.alt}
                    width={600}
                    height={750}
                    loading="eager"
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  {/* Fake Sticker */}
                  <div className="absolute top-6 -right-6 bg-yellow text-deep font-display font-black text-3xl uppercase py-2 px-12 rotate-[35deg] shadow-[4px_4px_0px_0px_rgba(13,27,42,1)] border-4 border-deep">
                    SOLD OUT
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6 md:p-8 bg-white flex justify-between items-end">
                  <div>
                    <h3 className="font-display font-black text-deep text-2xl md:text-3xl uppercase leading-none mb-2">
                      {FEATURED_HOODIE.name}
                    </h3>
                    <div className="font-display font-black text-yellow text-outline text-4xl">
                      {FEATURED_HOODIE.price}
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-deep text-white font-display font-black rounded-full flex items-center justify-center text-xl shrink-0 -rotate-12 border-4 border-yellow">
                    X
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
