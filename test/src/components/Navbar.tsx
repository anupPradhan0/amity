import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ShoppingCart, Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const NAV_LINKS = ['Home', 'Shop', 'Drops', 'About'] as const

const AmLogoSVG = () => (
  <svg width="48" height="32" viewBox="0 0 48 32" fill="none" aria-label="Amity Merch logo">
    <text
      x="0" y="26"
      className="font-display font-black text-[26px] fill-yellow"
      letterSpacing="-1"
    >
      A•M
    </text>
  </svg>
)

interface NavbarProps {
  cartCount?: number
}

export default function Navbar({ cartCount = 2 }: NavbarProps) {
  const shouldReduce = useReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={shouldReduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-deep/80 backdrop-blur-md border-b border-white/10"
    >
      <nav aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0" aria-label="Amity Merch home">
            <AmLogoSVG />
            <span className="text-white font-display font-bold text-lg hidden sm:block tracking-wide uppercase">
              Amity Merch
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-2 list-none" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="px-4 py-2 text-sm font-bold text-white uppercase tracking-widest hover:text-yellow transition-colors relative group min-h-[44px] flex items-center"
                >
                  {link}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-yellow scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              className="w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            <button
              className="relative w-11 h-11 flex items-center justify-center text-white/80 hover:text-white transition-colors rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-yellow text-deep text-[11px] font-black rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>

            <Button variant="default" size="default" className="hidden md:inline-flex font-bold uppercase tracking-wider text-xs">
              Shop Now
            </Button>

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden w-11 h-11 flex items-center justify-center text-white hover:text-yellow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow rounded-lg"
                  aria-label="Open menu"
                >
                  <Menu size={26} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-deep border-white/10 p-0">
                <SheetHeader className="p-6 border-b border-white/10">
                  <SheetTitle>
                    <AmLogoSVG />
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col px-4" aria-label="Mobile navigation">
                  {NAV_LINKS.map((link, i) => (
                    <motion.a
                      key={link}
                      href="#"
                      initial={shouldReduce ? false : { opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                      className="text-white font-display font-bold text-2xl uppercase tracking-widest py-4 border-b border-white/5 hover:text-yellow transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link}
                    </motion.a>
                  ))}
                  <div className="mt-8">
                    <Button variant="default" size="lg" className="w-full font-bold uppercase tracking-wider text-sm">
                      Shop Now
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}
