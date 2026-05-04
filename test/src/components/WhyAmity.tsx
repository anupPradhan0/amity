import { Shirt, Truck, Tag } from 'lucide-react'

export default function WhyAmity() {
  return (
    <section className="bg-surface py-24 px-4 sm:px-6 relative overflow-hidden" aria-labelledby="why-heading">
      {/* Background graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-stripes opacity-5 pointer-events-none -rotate-6" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2
            id="why-heading"
            className="text-deep font-display font-black text-6xl md:text-8xl uppercase tracking-tighter leading-[0.9] max-w-2xl"
          >
            NO <span className="text-transparent" style={{ WebkitTextStroke: '2px #0D1B2A' }}>CAP</span><br />
            JUST FACTS
          </h2>
          <div className="bg-yellow border-4 border-deep px-4 py-2 font-display font-black text-deep uppercase rotate-3 shadow-[4px_4px_0px_0px_rgba(13,27,42,1)]">
            Why Students Cop
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Large Card */}
          <div className="scroll-reveal relative min-h-[450px] lg:min-h-full border-4 border-deep bg-deep flex flex-col justify-end shadow-[12px_12px_0px_0px_rgba(13,27,42,1)] group">
            <img
              src="/assets/amity_fabric.png"
              alt="Premium fabric texture"
              width={800}
              height={800}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/60 to-transparent" />
            <div className="relative z-10 p-10 md:p-14">
              <div className="w-16 h-16 bg-yellow border-4 border-deep flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(13,27,42,1)] -rotate-6">
                <Shirt size={32} className="text-deep" strokeWidth={3} />
              </div>
              <h3 className="text-white font-display font-black text-4xl md:text-5xl mb-4 uppercase leading-none">
                Premium Built
              </h3>
              <p className="text-white/90 text-lg font-bold leading-relaxed max-w-md bg-deep/50 p-2">
                We source the highest quality fabrics that withstand late-night study sessions and everyday campus life. Built to last till graduation and beyond.
              </p>
            </div>
          </div>

          {/* Right Stacked Cards */}
          <div className="flex flex-col gap-8 lg:gap-12">
            <div className="scroll-reveal flex-1 bg-white p-10 shadow-[8px_8px_0px_0px_rgba(13,27,42,1)] border-4 border-deep relative" style={{ animationDelay: '0.1s' }}>
              <div className="absolute -top-6 -right-4 w-14 h-14 bg-sky border-4 border-deep rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(13,27,42,1)] z-10">
                <Truck size={24} className="text-white" strokeWidth={3} />
              </div>
              <h3 className="text-deep font-display font-black text-3xl md:text-4xl mb-4 uppercase leading-none">
                Fast Campus Drop
              </h3>
              <p className="text-deep/80 text-lg font-bold leading-relaxed">
                Direct to your dorm or department. Get your fresh merch delivered anywhere on campus within 48 hours. No middleman.
              </p>
            </div>

            <div className="scroll-reveal flex-1 bg-yellow p-10 shadow-[8px_8px_0px_0px_rgba(13,27,42,1)] border-4 border-deep relative" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -top-6 -right-4 w-14 h-14 bg-white border-4 border-deep rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(13,27,42,1)] z-10">
                <Tag size={24} className="text-deep" strokeWidth={3} />
              </div>
              <h3 className="text-deep font-display font-black text-3xl md:text-4xl mb-4 uppercase leading-none">
                Student Rates
              </h3>
              <p className="text-deep/80 text-lg font-bold leading-relaxed">
                Verify your Amity student ID to unlock exclusive discounts and early access to limited edition drops. Stay ahead of the hype.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
