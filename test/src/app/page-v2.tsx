import { motion } from 'framer-motion'
import { useState } from 'react'

type GradientBar = {
  width: number
  offset?: number
  color: string
}

const GradientBars = ({ bars }: { bars: GradientBar[] }) => (
  <div className="space-y-2">
    {bars.map((bar, index) => (
      <div
        key={index}
        className="h-3 rounded-full"
        style={{
          width: `${bar.width}px`,
          marginLeft: bar.offset ? `${bar.offset}px` : undefined,
          background: bar.color,
        }}
      />
    ))}
  </div>
)

const gradientSets: GradientBar[][] = [
  [
    { width: 160, color: 'linear-gradient(90deg, #1de35a, #6b5cff)' },
    { width: 120, offset: 28, color: 'linear-gradient(90deg, #6b5cff, #1de35a)' },
    { width: 180, offset: 10, color: 'linear-gradient(90deg, #2ee07a, #6b5cff)' },
  ],
  [
    { width: 150, color: 'linear-gradient(90deg, #7dff9a, #c4b9a8)' },
    { width: 110, offset: 20, color: 'linear-gradient(90deg, #c4b9a8, #7dff9a)' },
    { width: 170, offset: 12, color: 'linear-gradient(90deg, #7dff9a, #d7c4ff)' },
  ],
  [
    { width: 140, color: 'linear-gradient(90deg, #d7c4ff, #1de35a)' },
    { width: 110, offset: 18, color: 'linear-gradient(90deg, #1de35a, #d7c4ff)' },
    { width: 160, offset: 8, color: 'linear-gradient(90deg, #6b5cff, #1de35a)' },
  ],
]

export default function PageV2() {
  const [activeColor, setActiveColor] = useState({ name: 'Amity Yellow', color: '#F5C518', text: '#111111', desc: 'Bold Energy' });

  const colors = [
    { name: 'Vintage Grey', color: '#f7f1e8', text: '#111111', desc: 'Old Money Campus' },
    { name: 'Cotton Warm', color: '#f4efe2', text: '#111111', desc: 'Max Comfort' },
    { name: 'Charcoal', color: '#5a5454', text: '#f7f1e8', desc: 'Lowkey Fits' },
    { name: 'Night Black', color: '#1a1a1a', text: '#f7f1e8', desc: 'The Daily Uniform' },
    { name: 'Campus Green', color: '#1de35a', text: '#1a1a1a', desc: 'Iconic Amity' },
  ];

  return (
    <div className="relative min-h-screen bg-[#2f2f2f] text-white font-body overflow-hidden">
      {/* immersive animated background */}
      <div className="absolute inset-0 -z-20 immersive-blob pointer-events-none" />
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <section className="space-y-4">
          <div className="text-sm text-white/70">Fresh Heat</div>
          <div className="bg-[#3a3a3a] rounded-2xl p-6 shadow-lg">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#f4efe2] text-[#151515] rounded-xl p-6 flex flex-col justify-between min-h-[360px]"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-black/60">AMITY UNIVERSITY ONLINE</div>
                  <h2 className="mt-6 text-3xl font-display font-semibold leading-tight">
                    Campus
                    <br />
                    Merch
                  </h2>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-sm text-black/70">Level up your online lecture fits.</p>
                    <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">₹1,499</span>
                  </div>
                </div>
                <div className="mt-6 bg-white rounded-xl overflow-hidden shadow-sm">
                  <img
                    src="/assets/amity_hero_hoodie.png"
                    alt="Premium Hoodie"
                    className="w-full h-56 object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </motion.article>

              <div className="grid gap-6">
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-[#6b5cff] rounded-xl p-6 min-h-[210px]"
                >
                  <h3 className="text-3xl font-display font-semibold leading-tight">Drop 001</h3>
                  <p className="mt-6 text-xs uppercase tracking-[0.3em] text-white/70">April 2026</p>
                  <p className="mt-3 text-sm text-white/80 max-w-sm">
                    Cop the latest streetwear essentials before they sell out. No restocks.
                  </p>
                  <div className="mt-6">
                    <GradientBars bars={gradientSets[0]} />
                  </div>
                </motion.article>
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#1f1f1f] rounded-xl p-6 min-h-[210px] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl font-display font-semibold">The Classic Tee</h3>
                      <span className="bg-[#1de35a] text-black text-xs font-bold px-2 py-1 rounded-md">₹599</span>
                    </div>
                  </div>
                  <div className="mt-4 bg-[#111111] rounded-xl overflow-hidden">
                    <img
                      src="/assets/amity_tee.png"
                      alt="Classic Amity Tee"
                      className="w-full h-32 object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4">
                    <GradientBars bars={gradientSets[1]} />
                  </div>
                </motion.article>
              </div>

              <div className="grid gap-6">
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-[#1f1f1f] rounded-xl p-6 min-h-[210px] flex flex-col justify-between"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-display font-semibold">Caps & Accessories</h3>
                    <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded-md">From ₹399</span>
                  </div>
                  <div className="mt-4 bg-[#111111] rounded-xl overflow-hidden shadow-inner">
                    <img
                      src="/assets/amity_cap.png"
                      alt="Amity Street Cap"
                      className="w-full h-32 object-cover object-bottom"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4">
                    <GradientBars bars={gradientSets[2]} />
                  </div>
                </motion.article>
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-[#f4efe2] text-[#151515] rounded-xl p-6 min-h-[210px]"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-black/60">Behind the fit</div>
                  <h3 className="mt-4 text-lg font-display font-semibold">
                    Top-Tier Quality
                  </h3>
                  <p className="mt-3 text-sm text-black/70">
                    Insanely soft cotton blends. Peak comfort for long study sessions.
                  </p>
                  <div className="mt-6 bg-[#111111] rounded-xl overflow-hidden">
                    <img
                      src="/assets/amity_fabric.png"
                      alt="Amity Fabric Close-up"
                      className="w-full h-20 object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.article>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="text-sm text-white/70">Shop by Category</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Tops & Tees',
                bg: '#1f1f1f',
                img: '/assets/amity_tee.png',
                price: 'From ₹599',
              },
              {
                title: 'Hoodies',
                bg: '#1f1f1f',
                img: '/assets/amity_hero_hoodie.png',
                price: 'From ₹1,299',
              },
              {
                title: 'Accessories',
                bg: '#1f1f1f',
                img: '/assets/amity_cap.png',
                price: 'From ₹399',
              },
            ].map((cat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100 
                }}
                viewport={{ once: true, margin: '-50px' }}
                className="relative rounded-xl p-6 overflow-hidden h-[240px] flex items-end group cursor-pointer border border-white/5" 
                style={{ background: cat.bg }}
              >
                {/* Background image container taking up the top/middle space without interfering with text */}
                <div className="absolute inset-0 top-[-20px] transition-transform duration-[800ms] group-hover:scale-110 flex items-center justify-center opacity-80 group-hover:opacity-100">
                  <img src={cat.img} alt={cat.title} className="w-[80%] h-[80%] object-contain" />
                </div>
                {/* Dark gradient overlay at the bottom so text is easily readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="relative z-10 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="flex justify-between items-end">
                    <h3 className="text-2xl font-bold font-display text-white">{cat.title}</h3>
                    <span className="text-xs bg-white/10 text-white px-2 py-1 flex items-center rounded backdrop-blur-md font-semibold">{cat.price}</span>
                  </div>
                  <div className="text-sm mt-2 font-medium text-[#1de35a] flex items-center gap-2 opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                    Browse collection <span className="text-lg">→</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="text-sm text-white/70">Perks</div>
          <div className="bg-[#3a3a3a] rounded-2xl p-6">
            <div className="bg-[#1f1f1f] rounded-2xl p-8 grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
              <div>
                <h3 className="text-3xl font-display font-semibold leading-tight text-[#1de35a]">
                  Student
                  <br />
                  Only Codes
                </h3>
                <p className="mt-4 text-sm text-white/70">
                  You're part of the fam. Unlock crazy discounts and early access to all Amity Online merchandise drops. Cop the drip without breaking the bank.
                </p>
                <ul className="mt-4 text-xs text-white/60 space-y-2">
                  <li>✨ 20% off all Hoodies with your student ID.</li>
                  <li>🔥 Buy 2 Tops & Tees, get endless clout.</li>
                  <li>🚚 Free instant shipping on all semester drops.</li>
                </ul>
                <button className="mt-6 rounded-full bg-[#f4efe2] text-[#151515] text-sm font-semibold px-5 py-2 hover:bg-white transition-colors">
                  Unlock Discount
                </button>
              </div>
              <div className="relative bg-[#171717] rounded-2xl p-6 overflow-hidden min-h-[250px] flex items-center justify-center">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40 z-10">
                  <GradientBars bars={gradientSets[0]} />
                </div>
                <div className="absolute right-8 bottom-6 w-40 z-10">
                  <GradientBars bars={gradientSets[2]} />
                </div>
                {/* Visual placeholder for campus gear */}
                <div className="text-[120px] font-bold text-white/5 italic font-display whitespace-nowrap truncate select-none">
                  AMITY MERCH
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-10">
          <div className="text-sm text-white/70">Join the Movement</div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Card: Ambassador */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 bg-white text-black rounded-[24px] p-8 flex flex-col min-h-[380px] justify-between shadow-lg"
            >
              <div>
                <div className="flex justify-end mb-6">
                  <span className="bg-[#cdffce] text-[#0f5120] text-xs font-semibold px-3 py-1 rounded-full">
                    We're Hiring
                  </span>
                </div>
                <h3 className="text-4xl lg:text-5xl font-display font-medium tracking-tight mb-4">Brand Ambassador</h3>
                <div className="flex items-center gap-2 text-sm font-medium text-black/70">
                  <div className="w-2 h-2 rounded-full bg-[#6b5cff]"></div>
                  All Campuses & Online
                </div>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <button className="flex-1 bg-[#1a1a1a] text-white rounded-full py-3 text-sm font-semibold hover:bg-black transition-colors">
                  Join Discord
                </button>
                <button className="flex-1 bg-[#e5e5e5] text-black rounded-full py-3 text-sm font-semibold hover:bg-[#d4d4d4] transition-colors">
                  Share Info
                </button>
              </div>
            </motion.div>

            {/* Right Column: Two Cards */}
            <div className="md:col-span-7 flex flex-col gap-6">
              
              {/* Top Right Card: Top talent */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-[#6c625c] text-white rounded-[24px] p-8 min-h-[250px] relative overflow-hidden flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-12">
                  <span className="font-semibold text-lg">Amity Online</span>
                  <div className="w-4 h-4 bg-white/80 rounded-sm"></div>
                </div>
                <div className="flex justify-between items-end relative z-10 w-full mb-1">
                  <div className="max-w-[50%]">
                    <h3 className="text-4xl font-display font-light tracking-tight mb-3">Level up your portfolio</h3>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Get paid to rep Amity online. We build our community directly from the student body.
                    </p>
                  </div>
                  <div className="w-[140px] md:w-[180px] shrink-0 mb-[-32px] mr-[-32px] md:mr-0 z-0 border-b-4 border-[#8e5cff]">
                    {/* Placeholder for the person image from the design */}
                    <div className="bg-[#e4e0df] aspect-square object-cover object-top w-full overflow-hidden shadow-2xl">
                       <img src="/assets/amity_tee.png" alt="Talent" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-50" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Bottom Right Card: Developer */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white text-black rounded-[24px] p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div>
                  <h3 className="text-2xl font-display font-medium tracking-tight mb-4">Content Creator</h3>
                  <div className="text-[10px] text-black/50 font-medium uppercase tracking-widest">
                    Photography / Video / Social Media
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
                  <button className="px-8 bg-[#e5e5e5] text-black rounded-full py-3 text-sm font-semibold hover:bg-[#d4d4d4] transition-colors">
                    Share
                  </button>
                  <button className="px-8 bg-[#1a1a1a] text-white rounded-full py-3 text-sm font-semibold hover:bg-black transition-colors">
                    Apply
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        <section className="space-y-4 pt-10 pb-20">
          <div className="text-sm text-white/70">Campus Spirit</div>
          <div className="grid md:grid-cols-[1fr_1fr] gap-4">
            
            {/* Primary Merch Window */}
            <motion.div 
              layout
              className="rounded-xl p-8 relative flex flex-col justify-between min-h-[300px] md:min-h-[400px] overflow-hidden" 
              style={{ background: activeColor.color, color: activeColor.text }}
            >
              <div className="relative z-10 w-full flex justify-between items-start">
                <div>
                  <motion.div 
                    key={activeColor.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl lg:text-5xl font-bold font-display leading-[1.1] tracking-tight"
                  >
                    {activeColor.name.split(' ').map((word, i) => <div key={i}>{word}</div>)}
                  </motion.div>
                  <motion.div 
                    key={activeColor.desc}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ delay: 0.1 }}
                    className="mt-4 text-sm font-semibold tracking-wide"
                  >
                    {activeColor.desc}
                  </motion.div>
                </div>
              </div>
              
              {/* Floating Merch Visual */}
              <div className="absolute right-[-10%] bottom-[-10%] w-[120%] h-[120%] pointer-events-none flex items-end justify-end">
                <img 
                  src="/assets/amity_tee.png" 
                  alt="Merch Template" 
                  className="w-[80%] h-auto mix-blend-color-burn opacity-90 drop-shadow-2xl transform rotate-[-5deg] scale-110 object-contain"
                />
              </div>
            </motion.div>

            {/* Selection Grid */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveColor({ name: 'Amity Yellow', color: '#F5C518', text: '#111111', desc: 'Bold Energy' })}
                className={`rounded-xl p-6 flex flex-[1] min-h-[150px] flex-col justify-end text-left transition-all duration-300 ${activeColor.color === '#F5C518' ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-[0.98]' : 'hover:scale-[1.02]'}`}
                style={{ background: '#F5C518', color: '#111111' }}
              >
                <div className="text-sm font-semibold">Amity Yellow</div>
              </button>

              {colors.map((swatch) => (
                <button
                  key={swatch.name}
                  onClick={() => setActiveColor(swatch)}
                  className={`rounded-xl p-6 flex flex-col justify-end text-left transition-all duration-300 ${activeColor.color === swatch.color ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-[0.98]' : 'hover:scale-[1.02]'}`}
                  style={{ background: swatch.color, color: swatch.text }}
                >
                  <div className="text-sm font-semibold">{swatch.name}</div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="text-sm text-white/70">What the Campus is Saying</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                text: "The quality of the Drop 001 hoodie is actually insane. Literally living in it while attending my online lectures.",
                author: "Sarah J.",
                course: "BCA Online '26",
              },
              {
                text: "W fit. Finally, uni merch that I actually want to flex outside. The aesthetic is perfectly lowkey.",
                author: "Rahul M.",
                course: "BBA Online '25",
              },
              {
                text: "Delivery was quick and the fabric feels premium. Def getting the cap next to complete the fit.",
                author: "Aisha K.",
                course: "MCA Online '25",
              }
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-[#1f1f1f] p-8 rounded-2xl border border-white/5 flex flex-col justify-between"
              >
                <p className="text-lg text-white/90 leading-relaxed font-body mb-6">"{review.text}"</p>
                <div>
                  <div className="text-[#1de35a] font-bold">{review.author}</div>
                  <div className="text-xs text-white/50">{review.course}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-32 pt-20 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 pb-20">
            <div className="md:col-span-4 space-y-6">
              <h2 className="text-4xl font-display font-bold tracking-tight text-white mb-6">AMITY</h2>
              <p className="text-white/60 max-w-sm leading-relaxed text-sm">
                Premium streetwear that actually looks good on stream. Elevating the standard for online university fits with heavy cotton blends and lowkey aesthetics. Flex your campus pride.
              </p>
              <div className="flex flex-col gap-3 mt-8">
                <span className="text-xs uppercase tracking-widest text-[#1de35a] font-bold">Lock in for Drops</span>
                <div className="flex gap-2">
                  <input type="email" placeholder="student@amity.edu" className="bg-[#1f1f1f] text-white rounded-lg px-4 py-3 text-sm flex-1 outline-none focus:ring-1 focus:ring-[#1de35a] border border-white/5" />
                  <button className="bg-[#1de35a] text-black font-semibold px-6 py-3 rounded-lg hover:bg-white transition-colors text-sm">Subscribe</button>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
              <div className="space-y-6">
                <h4 className="font-display font-medium text-white text-lg">Shop</h4>
                <ul className="space-y-3 text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">New Arrivals <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Hoodies <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Tops & Tees <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Accessories <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-display font-medium text-white text-lg">Help</h4>
                <ul className="space-y-3 text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Track Order <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Returns <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Discounts <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">FAQ <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-display font-medium text-white text-lg">Social</h4>
                <ul className="space-y-3 text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Instagram <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">TikTok <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">X (Twitter) <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="font-display font-medium text-white text-lg">Legal</h4>
                <ul className="space-y-3 text-white/50">
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Privacy Policy <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                  <li><a href="#" className="hover:text-white transition-colors relative group py-1">Terms of Service <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#1de35a] transition-all group-hover:w-full"></span></a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] mx-[-1.5rem] px-6 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>© {new Date().getFullYear()} Amity Online Merch. All rights reserved.</p>
            <div className="flex gap-6 font-medium">
              <a href="#" className="hover:text-white transition-colors">Global Campus</a>
              <a href="#" className="hover:text-white transition-colors">amityonline.com</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}