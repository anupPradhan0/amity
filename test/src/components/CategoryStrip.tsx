import { motion, useReducedMotion } from 'framer-motion'

const categories = [
  {
    name: 'Tops & Tees',
    count: '24 items',
    image: '/assets/amity_tee.png',
  },
  {
    name: 'Hoodies',
    count: '16 items',
    image: '/assets/amity_hero_hoodie.png',
  },
  {
    name: 'Accessories',
    count: '32 items',
    image: '/assets/amity_cap.png',
  },
]

export default function CategoryStrip() {
  const shouldReduce = useReducedMotion()

  return (
    <section className="bg-yellow py-24 px-4 sm:px-6 border-y-4 border-deep relative overflow-hidden bg-noise" aria-label="Product Categories">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <h2 className="sr-only">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {categories.map((category, i) => (
            <motion.a
              key={category.name}
              href="#"
              className="group scroll-reveal block relative"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Brutalist offset background */}
              <div className="absolute inset-0 bg-deep translate-x-3 translate-y-3" />

              <div className="relative overflow-hidden h-72 md:h-96 bg-white border-4 border-deep transition-transform duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2">
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 w-full h-full bg-deep"
                  whileHover={shouldReduce ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <img
                    src={category.image}
                    alt={`${category.name} category`}
                    width={600}
                    height={600}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity transition-all duration-500 group-hover:opacity-80 group-hover:mix-blend-normal"
                  />
                  {/* Grain Overlay */}
                  <div className="absolute inset-0 bg-noise opacity-30" />
                </motion.div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 pointer-events-none">
                  <div className="self-end bg-white text-deep font-display font-black text-xs uppercase tracking-widest py-1 px-3 border-2 border-deep">
                    {category.count}
                  </div>
                  
                  <h3 className="text-white font-display font-black text-4xl md:text-5xl uppercase leading-none text-outline-white group-hover:text-white group-hover:text-outline-none transition-all duration-300">
                    {category.name}
                  </h3>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
