import learner1 from "@/assets/learner-1.jpg";
import learner2 from "@/assets/learner-2.jpg";
import learner3 from "@/assets/learner-3.jpg";
import learner4 from "@/assets/learner-4.jpg";
import learnerGroup from "@/assets/learner-group.jpg";

const looks = [
  { src: learnerGroup, name: "The Squad", crew: "BBA · Class of 26", products: ["Scholar Tee", "CM Hoodie", "Yellow Cap"] },
  { src: learner1, name: "Aarav K.", crew: "MCA · Year 2", products: ["Amity Scholar Tee White"] },
  { src: learner2, name: "Priya S.", crew: "MBA · Year 1", products: ["CM Hoodie Navy", "Canvas Tote"] },
  { src: learner3, name: "Rohan M.", crew: "BTech · Year 3", products: ["CM Tee Navy", "Coffee Mug"] },
  { src: learner4, name: "Ananya V.", crew: "MA · Year 2", products: ["Snapback Cap", "Backpack"] },
  { src: learnerGroup, name: "Movement", crew: "Campus Activation", products: ["Full Capsule"] },
];

export default function LookbookPage() {
  return (
    <main>
      <section className="container pt-12 pb-6 text-center">
        <div className="text-secondary-foreground bg-secondary inline-block text-[10px] tracking-[0.3em] font-bold px-3 py-1 rounded">LOOKBOOK · SS '26</div>
        <h1 className="font-display text-5xl lg:text-7xl font-bold mt-4">Worn by Amity learners.</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Real students. Real fits. Tag <span className="text-primary font-semibold">#AmityCampusMerch</span> to be featured next.</p>
      </section>

      <section className="container py-10 grid md:grid-cols-2 gap-6">
        {looks.map((l, i) => (
          <div key={i} className={`group relative overflow-hidden rounded-3xl shadow-card-soft hover:shadow-hero transition-all ${i % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"}`}>
            <img src={l.src} alt={l.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
              <div className="text-secondary text-[10px] tracking-[0.3em] font-bold">LOOK · {String(i + 1).padStart(2, "0")}</div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mt-1">{l.name}</h2>
              <div className="text-sm opacity-80">{l.crew}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {l.products.map(p => <span key={p} className="text-xs bg-background/15 backdrop-blur border border-secondary/40 px-2.5 py-1 rounded-full">{p}</span>)}
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
