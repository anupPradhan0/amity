import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const FooterLogoSVG = () => (
  <svg width="80" height="60" viewBox="0 0 48 32" fill="none" aria-label="Amity Merch logo">
    <text
      x="0" y="26"
      className="font-display font-black text-[26px] fill-yellow stroke-deep stroke-[1px]"
      letterSpacing="-1"
    >
      A•M
    </text>
  </svg>
)

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-deep pt-24 pb-12 px-4 sm:px-6 border-t-[12px] border-yellow bg-noise" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-8">
            <div className="bg-white p-4 border-4 border-deep inline-flex self-start -rotate-2">
              <FooterLogoSVG />
            </div>
            <p className="text-white text-xl font-bold leading-snug max-w-sm">
              The official merchandise store for Amity University students. Wear your pride on campus and beyond.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 bg-white flex items-center justify-center border-4 border-deep hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(245,197,24,1)] transition-all" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D1B2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-12 h-12 bg-white flex items-center justify-center border-4 border-deep hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(245,197,24,1)] transition-all" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D1B2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-yellow font-display font-black text-3xl mb-8 uppercase tracking-widest border-b-4 border-yellow pb-2 inline-block">
              Links
            </h3>
            <ul className="flex flex-col gap-4">
              {['Shop All', 'New Drops', 'Hoodies', 'Accessories', 'Size Guide'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white text-xl font-black uppercase tracking-wider hover:text-yellow hover:translate-x-2 transition-transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Student Help */}
          <div>
            <h3 className="text-yellow font-display font-black text-3xl mb-8 uppercase tracking-widest border-b-4 border-yellow pb-2 inline-block">
              Help
            </h3>
            <ul className="flex flex-col gap-4">
              {['FAQ', 'Track Order', 'Returns', 'Contact Us', 'Ambassadors'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white text-xl font-black uppercase tracking-wider hover:text-yellow hover:translate-x-2 transition-transform inline-block">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="text-yellow font-display font-black text-3xl mb-8 uppercase tracking-widest border-b-4 border-yellow pb-2 inline-block">
              Club
            </h3>
            <p className="text-white text-xl font-bold mb-6">
              Subscribe for early access to drops and exclusive discounts.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4 bg-white p-6 border-4 border-deep shadow-[8px_8px_0px_0px_rgba(245,197,24,1)] rotate-1">
              <Input
                type="email"
                placeholder="STUDENT EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 bg-surface border-4 border-deep text-deep font-black placeholder:text-deep/50 uppercase tracking-widest focus-visible:ring-0 focus-visible:border-sky rounded-none"
                aria-label="Email address for newsletter"
              />
              <Button type="submit" variant="deep" className="w-full h-14 font-black uppercase tracking-widest text-xl rounded-none border-4 border-deep shadow-none hover:shadow-none hover:bg-yellow hover:text-deep">
                {subscribed ? 'LOCKED IN 🔒' : 'JOIN NOW'}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t-4 border-white/20">
          <p className="text-yellow font-display font-black uppercase tracking-widest text-lg">
            © {new Date().getFullYear()} AMITY MERCH
          </p>
          <p className="text-white font-bold uppercase tracking-widest text-sm bg-deep border-2 border-white/20 px-4 py-2">
            DESIGNED BY STUDENTS
          </p>
        </div>
      </div>
    </footer>
  )
}
