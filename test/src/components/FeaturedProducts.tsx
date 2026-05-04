import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/products'

export default function FeaturedProducts() {
  const shouldReduce = useReducedMotion()
  const [addedId, setAddedId] = useState<number | null>(null)

  const handleAdd = (id: number) => {
    setAddedId(id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <section className="bg-surface py-24 px-4 sm:px-6 relative overflow-hidden" aria-labelledby="featured-heading">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-deep pb-6">
          <div>
            <div className="inline-block bg-deep text-white font-display font-black uppercase text-xs tracking-widest py-1 px-3 mb-4 -rotate-2">
              Most Popular
            </div>
            <h2
              id="featured-heading"
              className="text-deep font-display font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none"
            >
              Featured<br />Drops
            </h2>
          </div>
          <Button variant="outline" size="lg" className="hidden md:inline-flex bg-white shrink-0">
            View All Products
            <ArrowRight size={22} className="ml-3 transition-transform group-hover:translate-x-1" strokeWidth={3} />
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              className="scroll-reveal"
              whileHover={shouldReduce ? {} : { scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="bg-white border-4 border-deep shadow-[8px_8px_0px_0px_rgba(13,27,42,1)] group cursor-pointer transition-shadow hover:shadow-[12px_12px_0px_0px_rgba(13,27,42,1)] h-full flex flex-col relative">
                
                {/* Image */}
                <div className="relative overflow-hidden aspect-square border-b-4 border-deep bg-noise">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={600}
                    height={600}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Sticker */}
                  <div className="absolute top-4 left-4 z-10 bg-white text-deep font-display font-black text-sm uppercase tracking-widest py-1.5 px-4 border-2 border-deep shadow-[2px_2px_0px_0px_rgba(13,27,42,1)] -rotate-3">
                    {product.category}
                  </div>
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
                  <h3 className="text-deep font-display font-black text-2xl md:text-3xl uppercase leading-none mb-4 group-hover:text-sky transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-end gap-3 mb-8">
                    <span className="font-display font-black text-4xl text-deep leading-none">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-muted text-lg font-bold line-through mb-1">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant={addedId === product.id ? 'default' : 'deep'}
                      size="lg"
                      className="w-full relative overflow-hidden"
                      onClick={(e) => {
                        e.preventDefault()
                        handleAdd(product.id)
                      }}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <motion.div
                        className="flex items-center justify-center w-full"
                        animate={{ y: addedId === product.id ? -40 : 0 }}
                      >
                        <ShoppingCart size={20} className="mr-2" /> Add to Cart
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-yellow text-deep w-full h-full"
                        initial={{ y: 40 }}
                        animate={{ y: addedId === product.id ? 0 : 40 }}
                      >
                        Secured! 🔒
                      </motion.div>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="flex justify-center mt-12 md:hidden">
          <Button variant="outline" size="lg" className="w-full bg-white">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
