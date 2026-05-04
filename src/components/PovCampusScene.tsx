import { useEffect, useRef, useState } from "react";
import campusImg from "@/assets/amity-campus.jpg";
import povImg from "@/assets/pov-walk-1.jpg";
import storeImg from "@/assets/store-front.jpg";
import interiorImg from "@/assets/store-interior.jpg";
import { Link } from "react-router-dom";
import { ChevronDown, DoorOpen } from "lucide-react";

/**
 * POV Campus Walk — scroll-driven cinematic sequence.
 * 4 stages over ~400vh:
 *  0.00–0.25  Approach Amity campus (zoom in on building)
 *  0.25–0.55  Walking POV with handheld shake (vlog-style)
 *  0.55–0.80  Arrive at "Campus Merch" store (digital signage)
 *  0.80–1.00  Doors open → reveal interior + CTA
 */
export default function PovCampusScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..1 across the entire scene
  const [shake, setShake] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setProgress(total > 0 ? scrolled / total : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Handheld camera shake during the walking phase
  useEffect(() => {
    if (progress < 0.2 || progress > 0.85) { setShake({ x: 0, y: 0 }); return; }
    const id = setInterval(() => {
      setShake({ x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 6 });
    }, 90);
    return () => clearInterval(id);
  }, [progress]);

  // Stage progress helpers
  const stage = (start: number, end: number) => Math.max(0, Math.min(1, (progress - start) / (end - start)));
  const sCampus = stage(0.0, 0.28);
  const sWalk = stage(0.22, 0.55);
  const sStore = stage(0.5, 0.78);
  const sDoor = stage(0.75, 1.0);

  // Stage labels
  const label =
    progress < 0.22 ? "📍 AMITY UNIVERSITY · NOIDA" :
    progress < 0.55 ? "🚶 WALKING THROUGH CAMPUS" :
    progress < 0.78 ? "🛍 CAMPUS MERCH STORE — BLOCK D" :
    "✨ STEP INSIDE";

  return (
    <section ref={wrapRef} className="relative h-[400vh]" aria-label="Immersive campus walk to Campus Merch store">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Stage 1 — Campus approach (zooms IN as you scroll) */}
        <Layer
          src={campusImg}
          opacity={1 - sWalk * 1.2}
          style={{
            transform: `scale(${1.0 + sCampus * 0.4}) translateY(${-sCampus * 30}px)`,
          }}
        />

        {/* Stage 2 — POV walking (camera shake) */}
        <Layer
          src={povImg}
          opacity={Math.min(sWalk * 1.6, 1) * (1 - sStore * 1.3)}
          style={{
            transform: `scale(${1.05 + sWalk * 0.18}) translate(${shake.x}px, ${shake.y}px)`,
          }}
        />

        {/* Stage 3 — Store front with digital "CAMPUS MERCH" signage */}
        <Layer
          src={storeImg}
          opacity={Math.min(sStore * 1.4, 1)}
          style={{
            transform: `scale(${1.0 + sStore * 0.25}) translate(${shake.x * 0.5}px, ${shake.y * 0.5}px)`,
          }}
        />

        {/* Stage 4 — Interior reveal under "doors" */}
        <Layer
          src={interiorImg}
          opacity={sDoor}
          style={{ transform: `scale(${1.05 + sDoor * 0.1})` }}
        />

        {/* Sliding door panels (Stage 4) */}
        <DoorPanels progress={sDoor} />

        {/* Custom digital "CAMPUS MERCH" signage overlay (Stage 3) — replaces messy AI text */}
        {sStore > 0.2 && sDoor < 0.6 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500"
            style={{
              top: `${22 - sStore * 4}%`,
              opacity: Math.min(sStore * 2, 1) * (1 - sDoor * 1.5),
              transform: `translate(calc(-50% + ${shake.x * 0.3}px), ${shake.y * 0.3}px) scale(${0.9 + sStore * 0.1})`,
            }}
          >
            <div className="relative px-8 py-4 bg-primary border-4 border-secondary rounded-md shadow-glow scanline overflow-hidden">
              <div className="absolute inset-0 bg-spotlight" />
              <div className="relative font-brand text-secondary text-3xl sm:text-5xl lg:text-6xl tracking-[0.15em] flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-secondary animate-ticker-blink" />
                CAMPUS MERCH
                <span className="h-3 w-3 rounded-full bg-secondary animate-ticker-blink" />
              </div>
              <div className="relative text-[10px] sm:text-xs text-secondary/70 mt-1 tracking-[0.3em]">OFFICIAL · AMITY ONLINE · EST. 2024</div>
            </div>
          </div>
        )}

        {/* Camera viewfinder UI (Stages 2 & 3) */}
        {progress > 0.18 && progress < 0.85 && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Corner brackets */}
            {[
              "top-8 left-8 border-t-2 border-l-2",
              "top-8 right-8 border-t-2 border-r-2",
              "bottom-8 left-8 border-b-2 border-l-2",
              "bottom-8 right-8 border-b-2 border-r-2",
            ].map((c, i) => <div key={i} className={`absolute h-10 w-10 border-secondary/80 ${c}`} />)}
            {/* REC indicator */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded">
              <span className="h-2.5 w-2.5 bg-red-500 rounded-full animate-ticker-blink" />
              <span className="text-white text-xs font-mono tracking-widest">REC · 4K · POV</span>
            </div>
            {/* Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-secondary/60" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-secondary/60" />
            </div>
          </div>
        )}

        {/* Bottom location label */}
        <div className="absolute bottom-24 left-0 right-0 z-30 px-6 text-center">
          <div className="inline-block bg-background/90 backdrop-blur-md px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-semibold text-navy shadow-card-soft border border-secondary/30">
            {label}
          </div>
        </div>

        {/* "Open Door" CTA when nearly at the store */}
        {sStore > 0.6 && sDoor < 0.85 && (
          <div className="absolute inset-x-0 bottom-36 z-30 flex justify-center animate-fade-in">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <DoorOpen className="h-12 w-12 text-secondary animate-pulse-glow rounded-full bg-primary p-2" />
              </div>
              <div className="text-secondary text-sm font-bold tracking-widest font-display drop-shadow-lg">
                {sDoor < 0.1 ? "SCROLL TO OPEN DOORS" : "DOORS OPENING..."}
              </div>
            </div>
          </div>
        )}

        {/* Final reveal CTA */}
        {sDoor > 0.7 && (
          <div className="absolute inset-0 z-40 flex items-center justify-center animate-fade-in-up">
            <div className="text-center px-6">
              <div className="text-secondary font-brand text-6xl sm:text-8xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">WELCOME IN</div>
              <p className="text-white/90 mt-3 text-sm sm:text-base max-w-md mx-auto">You've entered the Campus Merch store. Pick a rack to explore.</p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/category/apparels" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-bold hover:scale-105 transition-transform shadow-glow">
                  Browse Apparels
                </Link>
                <Link to="/category/accessories" className="px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/40 rounded-full font-semibold hover:bg-white/20 transition-colors">
                  Accessories & Drinkware
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Scroll hint */}
        {progress < 0.05 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-white/80 flex flex-col items-center gap-1 animate-pulse-glow rounded-full px-3 py-2">
            <span className="text-[10px] tracking-[0.3em]">SCROLL TO WALK</span>
            <ChevronDown className="h-5 w-5" />
          </div>
        )}

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none rack-vignette" />
      </div>
    </section>
  );
}

function Layer({ src, opacity, style }: { src: string; opacity: number; style?: React.CSSProperties }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-300 will-change-transform"
      style={{ opacity: Math.max(0, Math.min(1, opacity)), ...style }}
    >
      <img src={src} alt="" className="h-full w-full object-cover" loading="eager" />
    </div>
  );
}

function DoorPanels({ progress }: { progress: number }) {
  if (progress <= 0) return null;
  const offset = progress * 55; // % translate
  return (
    <div className="absolute inset-0 z-25 pointer-events-none">
      <div
        className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-primary via-primary to-primary-glow border-r-4 border-secondary"
        style={{ transform: `translateX(-${offset}%) skewY(${progress * 1.5}deg)`, transformOrigin: "left center" }}
      >
        <div className="absolute inset-y-0 right-0 w-1 bg-secondary/60 shadow-[0_0_30px_hsl(47_100%_51%/0.6)]" />
        <div className="absolute top-1/2 right-4 -translate-y-1/2 h-20 w-1.5 bg-secondary/80 rounded-full" />
      </div>
      <div
        className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-primary via-primary to-primary-glow border-l-4 border-secondary"
        style={{ transform: `translateX(${offset}%) skewY(-${progress * 1.5}deg)`, transformOrigin: "right center" }}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-secondary/60 shadow-[0_0_30px_hsl(47_100%_51%/0.6)]" />
        <div className="absolute top-1/2 left-4 -translate-y-1/2 h-20 w-1.5 bg-secondary/80 rounded-full" />
      </div>
    </div>
  );
}
