import PovCampusScene from "@/components/PovCampusScene";
import { Video } from "lucide-react";

export default function StorePage() {
  return (
    <main>
      <section className="relative border-b border-border/60 bg-muted/30">
        <div className="container pt-16 pb-10 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-background/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.3em] text-foreground shadow-card-soft backdrop-blur-sm">
              <Video className="h-3.5 w-3.5 text-secondary" aria-hidden />
              VIRTUAL CAMPUS WALK
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Walk through Amity. Step into the store.
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              First-person camera POV across the Noida campus, ending at Campus Merch. Scroll the page to walk the path — the doors open when you reach the entrance.
            </p>
          </div>
        </div>
      </section>
      <PovCampusScene />
    </main>
  );
}
