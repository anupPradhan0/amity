import PovCampusScene from "@/components/PovCampusScene";

export default function StorePage() {
  return (
    <main>
      <section className="container pt-12 pb-6 text-center">
        <div className="text-secondary-foreground bg-secondary inline-block text-[10px] tracking-[0.3em] font-bold px-3 py-1 rounded">VIRTUAL CAMPUS WALK</div>
        <h1 className="font-display text-4xl lg:text-6xl font-bold mt-4">Walk through Amity. Step into the store.</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">A first-person camera POV across the Noida campus, ending at the Campus Merch store. Scroll to walk — doors open when you arrive.</p>
      </section>
      <PovCampusScene />
    </main>
  );
}
