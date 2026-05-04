import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Aisha Sharma',
    dept: "B.Tech CSE '25",
    quote: "The quality of the classic hoodie is unreal. It's so soft inside and the print hasn't faded even after multiple washes. Definitely my go-to campus fit now.",
    rotation: '-rotate-2'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    dept: "BBA '24",
    quote: "Ordered the drop season tee on Tuesday and had it delivered to my dorm by Thursday. The fit is perfect and the design is super clean.",
    rotation: 'rotate-1'
  },
  {
    id: 3,
    name: 'Priya Desai',
    dept: "B.Des '26",
    quote: "As a design student, I really appreciate the typography and minimal aesthetic of the new merch collection. It doesn't look like cheap promo gear; it genuinely feels premium.",
    rotation: '-rotate-1'
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 border-t-8 border-deep" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto w-full">
        <h2
          id="testimonials-heading"
          className="text-deep font-display font-black text-6xl md:text-8xl uppercase tracking-tighter mb-20 text-center"
        >
          Who <span className="text-outline">Copped?</span>
        </h2>

        {/* Mobile snap container, desktop grid */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-10 pb-12 lg:pb-0 snap-x snap-mandatory hide-scrollbar pt-4">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`scroll-reveal min-w-[320px] lg:min-w-0 snap-center bg-surface border-4 border-deep p-8 md:p-10 flex flex-col shadow-[8px_8px_0px_0px_rgba(13,27,42,1)] ${t.rotation} hover:rotate-0 hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(13,27,42,1)] transition-all duration-300`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-center gap-1 mb-8 text-deep">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={28} fill="#F5C518" strokeWidth={3} className="text-deep" />
                ))}
              </div>
              <blockquote className="text-deep font-bold text-xl leading-relaxed mb-10 flex-grow relative">
                <span className="absolute -top-6 -left-4 text-7xl text-yellow font-display font-black opacity-40 leading-none">"</span>
                <span className="relative z-10 uppercase">{t.quote}</span>
              </blockquote>
              <div className="pt-6 border-t-4 border-deep">
                <div className="font-display font-black uppercase text-2xl text-deep mb-1">
                  {t.name}
                </div>
                <div className="bg-deep text-yellow font-bold tracking-widest uppercase text-xs inline-block px-3 py-1">
                  {t.dept}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
