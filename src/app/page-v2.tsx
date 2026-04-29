import { motion } from 'framer-motion'

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
  return (
    <div className="min-h-screen bg-[#2f2f2f] text-white font-body">
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
        <section className="space-y-4">
          <div className="text-sm text-white/70">Socials</div>
          <div className="bg-[#3a3a3a] rounded-2xl p-6 shadow-lg">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr]">
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#f4efe2] text-[#151515] rounded-xl p-6 flex flex-col justify-between min-h-[360px]"
              >
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-black/60">AMITY</div>
                  <h2 className="mt-6 text-3xl font-display font-semibold leading-tight">
                    Premium
                    <br />
                    Apparel
                  </h2>
                  <p className="mt-4 text-sm text-black/70">Elevating standard streetwear</p>
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
                    Grab the latest premium gear before it's gone forever.
                  </p>
                  <div className="mt-6">
                    <GradientBars bars={gradientSets[0]} />
                  </div>
                </motion.article>
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#1f1f1f] rounded-xl p-6 min-h-[210px]"
                >
                  <h3 className="text-2xl font-display font-semibold">The Classic Tee</h3>
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
                  className="bg-[#1f1f1f] rounded-xl p-6 min-h-[210px]"
                >
                  <h3 className="text-2xl font-display font-semibold">Caps & Accessories</h3>
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
                  <div className="text-xs uppercase tracking-[0.3em] text-black/60">Behind the Scenes</div>
                  <h3 className="mt-4 text-lg font-display font-semibold">
                    The Perfect Fabric
                  </h3>
                  <p className="mt-3 text-sm text-black/70">
                    Premium cotton blends sourced ethically.
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
          <div className="text-sm text-white/70">Gradients</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'linear-gradient(135deg, #1a1a1a, #111111)',
              'linear-gradient(135deg, #b9ff9e, #e6e1d6)',
              'linear-gradient(135deg, #f7f1e8, #f1ece2)',
              'linear-gradient(135deg, #f7f1e8, #e4d6ff)',
              'linear-gradient(135deg, #1a1a1a, #111111)',
              'linear-gradient(135deg, #6b5cff, #cdb9ff)',
            ].map((bg, index) => (
              <div key={index} className="rounded-xl p-6" style={{ background: bg }}>
                <GradientBars bars={gradientSets[index % gradientSets.length]} />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="text-sm text-white/70">Web Mockup</div>
          <div className="bg-[#3a3a3a] rounded-2xl p-6">
            <div className="bg-[#1f1f1f] rounded-2xl p-8 grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
              <div>
                <h3 className="text-3xl font-display font-semibold leading-tight">
                  Collaborative
                  <br />
                  Expertise
                </h3>
                <p className="mt-4 text-sm text-white/70">
                  We share experiences and build Solvd's expertise like a puzzle that all fits together.
                </p>
                <ul className="mt-4 text-xs text-white/60 space-y-2">
                  <li>Close cooperation between departments.</li>
                  <li>Understanding decisions at one stage affect the next.</li>
                  <li>United by a single goal.</li>
                </ul>
                <button className="mt-6 rounded-full bg-[#f4efe2] text-[#151515] text-sm font-semibold px-5 py-2">
                  Contact us
                </button>
              </div>
              <div className="relative bg-[#171717] rounded-2xl p-6 overflow-hidden">
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <div key={index} className="aspect-square border border-white/10 rounded-md" />
                  ))}
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-40">
                  <GradientBars bars={gradientSets[0]} />
                </div>
                <div className="absolute right-8 bottom-6 w-40">
                  <GradientBars bars={gradientSets[2]} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="text-sm text-white/70">Colors</div>
          <div className="grid md:grid-cols-[1fr_1fr] gap-4">
            <div className="rounded-xl p-6 text-black" style={{ background: '#15e65a' }}>
              <div className="text-sm font-semibold">Green</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Grey', color: '#f7f1e8', text: '#111111' },
                { name: 'Warm Grey', color: '#f4efe2', text: '#111111' },
                { name: 'Grey', color: '#c7c2bc', text: '#111111' },
                { name: 'Brown', color: '#b39a9a', text: '#111111' },
                { name: 'Grey', color: '#5a5454', text: '#f7f1e8' },
                { name: 'Mint', color: '#bfffa7', text: '#111111' },
                { name: 'Grey', color: '#2a2a2a', text: '#f7f1e8' },
                { name: 'Purple', color: '#6b5cff', text: '#f7f1e8' },
              ].map((swatch) => (
                <div
                  key={swatch.name}
                  className="rounded-xl p-4"
                  style={{ background: swatch.color, color: swatch.text }}
                >
                  <div className="text-sm font-semibold">{swatch.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}