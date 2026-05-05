import { useEffect, useRef, useState } from "react";
import campusImg from "@/assets/amity-campus.jpg";
import povImg from "@/assets/pov-walk-1.jpg";
import storeImg from "@/assets/store-front.jpg";
import interiorImg from "@/assets/store-interior.jpg";
import { Link } from "react-router-dom";
import { ChevronDown, DoorOpen, Footprints, MapPin, Sparkles, Store, Video } from "lucide-react";
import { cn } from "@/lib/utils";

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

  // Stage copy — icon + title + subtitle (no emoji) for a cleaner HUD
  const stageHud =
    progress < 0.22 ?
      { Icon: MapPin, title: "Amity University", sub: "Noida · Sector 125" } :
    progress < 0.55 ?
      { Icon: Footprints, title: "Campus walk", sub: "First-person POV · Block D approach" } :
    progress < 0.78 ?
      { Icon: Store, title: "Campus Merch", sub: "Official store · Amity Online" } :
      { Icon: Sparkles, title: "Step inside", sub: "Doors opening — you're almost in" };

  const recTime = `${String(Math.floor(progress * 3)).padStart(2, "0")}:${String(Math.floor((progress * 60) % 60)).padStart(2, "0")}:${String(Math.floor((progress * 100) % 100)).padStart(2, "0")}`;
  const StageIcon = stageHud.Icon;

  return (
    <section ref={wrapRef} className="relative h-[400vh]" aria-label="Immersive campus walk to Campus Merch store">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
        {/* Stage 1 — Campus approach (zooms IN as you scroll) */}
        <Layer
          src={campusImg}
          alt="Amity University campus buildings at sunrise, wide aerial-style view."
          opacity={1 - sWalk * 1.2}
          style={{
            transform: `scale(${1.0 + sCampus * 0.4}) translateY(${-sCampus * 30}px)`,
          }}
          imgClassName="object-[center_40%]"
        />

        {/* Stage 2 — POV walking (camera shake) */}
        <Layer
          src={povImg}
          alt="First-person view walking paths on the Amity University campus."
          opacity={Math.min(sWalk * 1.6, 1) * (1 - sStore * 1.3)}
          style={{
            transform: `scale(${1.05 + sWalk * 0.18}) translate(${shake.x}px, ${shake.y}px)`,
          }}
        />

        {/* Stage 3 — Store front with digital "CAMPUS MERCH" signage */}
        <Layer
          src={storeImg}
          alt="Campus Merch storefront exterior at Amity University."
          opacity={Math.min(sStore * 1.4, 1)}
          style={{
            transform: `scale(${1.0 + sStore * 0.25}) translate(${shake.x * 0.5}px, ${shake.y * 0.5}px)`,
          }}
        />

        {/* Stage 4 — Interior reveal under "doors" */}
        <Layer
          src={interiorImg}
          alt="Inside Campus Merch — apparel and accessories on display."
          opacity={sDoor}
          style={{ transform: `scale(${1.05 + sDoor * 0.1})` }}
          imgClassName="object-[center_38%] saturate-[0.93] contrast-[1.03] brightness-[0.99]"
        />

        {/* Tops of frames are often very bright — subtle gradient keeps HUD / REC readable */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[8] h-32 bg-gradient-to-b from-black/30 via-black/5 to-transparent sm:h-40"
          aria-hidden
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
            <div className="relative rounded-2xl px-7 py-5 sm:px-10 sm:py-6 bg-primary/95 backdrop-blur-sm border border-secondary/40 ring-2 ring-secondary/25 shadow-[0_0_60px_-8px_hsl(47_100%_51%/0.45)] scanline overflow-hidden">
              <div className="absolute inset-0 bg-spotlight opacity-90" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/80 to-transparent" />
              <div className="relative font-brand text-secondary text-3xl sm:text-5xl lg:text-6xl tracking-[0.12em] flex items-center justify-center gap-3 sm:gap-4">
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 rounded-full bg-secondary shadow-glow animate-ticker-blink" />
                CAMPUS MERCH
                <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0 rounded-full bg-secondary shadow-glow animate-ticker-blink" />
              </div>
              <div className="relative text-[10px] sm:text-xs text-secondary/80 mt-2 text-center tracking-[0.28em] font-medium">
                OFFICIAL · AMITY ONLINE · EST. 2024
              </div>
            </div>
          </div>
        )}

        {/* Camera viewfinder UI (Stages 2 & 3) */}
        {progress > 0.18 && progress < 0.85 && (
          <div className="absolute inset-0 pointer-events-none z-30">
            {/* Corner brackets — softer, with glow */}
            {[
              "top-6 left-6 sm:top-10 sm:left-10 border-t-[3px] border-l-[3px]",
              "top-6 right-6 sm:top-10 sm:right-10 border-t-[3px] border-r-[3px]",
              "bottom-6 left-6 sm:bottom-10 sm:left-10 border-b-[3px] border-l-[3px]",
              "bottom-6 right-6 sm:bottom-10 sm:right-10 border-b-[3px] border-r-[3px]",
            ].map((c, i) => (
              <div
                key={i}
                className={`absolute h-12 w-12 sm:h-14 sm:w-14 border-secondary ${c} shadow-[0_0_20px_hsl(47_100%_51%/0.25)]`}
              />
            ))}
            {/* REC bar */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 sm:top-10 flex items-stretch overflow-hidden rounded-full border border-white/15 bg-black/55 backdrop-blur-md shadow-lg">
              <div className="flex items-center gap-2 pl-3 pr-2 py-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-40" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white">Rec</span>
              </div>
              <div className="flex items-center gap-1.5 border-l border-white/10 px-3 py-2 text-[11px] font-mono tabular-nums text-white/90">
                <Video className="h-3.5 w-3.5 text-secondary opacity-90" aria-hidden />
                <span>4K POV</span>
              </div>
              <div className="flex items-center border-l border-white/10 bg-black/30 px-3 py-2 text-[11px] font-mono tabular-nums text-secondary">
                {recTime}
              </div>
            </div>
            {/* Crosshair — subtle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 opacity-50">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-white/50" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/50" />
            </div>
          </div>
        )}

        {/* Bottom location HUD */}
        <div className="absolute bottom-24 left-0 right-0 z-30 px-4 sm:px-6 flex justify-center pointer-events-none">
          <div className="inline-flex max-w-[min(100%,28rem)] items-center gap-3 sm:gap-4 rounded-2xl border border-secondary/25 bg-primary/88 px-4 py-3 sm:px-5 sm:py-3.5 text-left shadow-hero backdrop-blur-md">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 ring-1 ring-secondary/35">
              <StageIcon className="h-5 w-5 text-secondary" aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="font-display text-sm sm:text-base font-semibold leading-tight text-primary-foreground">
                {stageHud.title}
              </div>
              <div className="mt-0.5 text-[11px] sm:text-xs text-primary-foreground/65 leading-snug">
                {stageHud.sub}
              </div>
            </div>
          </div>
        </div>

        {/* "Open Door" CTA when nearly at the store */}
        {sStore > 0.6 && sDoor < 0.85 && (
          <div className="absolute inset-x-0 bottom-36 z-30 flex justify-center animate-fade-in px-4">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-secondary/20 bg-black/45 px-6 py-4 backdrop-blur-md shadow-lg">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary ring-2 ring-secondary/50 shadow-glow">
                <DoorOpen className="h-7 w-7 text-secondary animate-pulse-glow" strokeWidth={2} />
              </div>
              <div className="text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary">
                  {sDoor < 0.1 ? "Arrived at entrance" : "Opening"}
                </div>
                <div className="mt-1 font-display text-sm font-bold tracking-wide text-white drop-shadow-md">
                  {sDoor < 0.1 ? "Keep scrolling to open the doors" : "Doors opening…"}
                </div>
              </div>
              {/* Progress tick */}
              <div className="h-1 w-full max-w-[12rem] overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-secondary shadow-[0_0_12px_hsl(47_100%_51%/0.6)] transition-[width] duration-150"
                  style={{ width: `${Math.min(100, sDoor * 140)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Final reveal CTA */}
        {sDoor > 0.7 && (
          <div className="absolute inset-0 z-40 flex items-center justify-center animate-fade-in-up px-4">
            <div className="relative w-full max-w-lg text-center">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-secondary/20 via-transparent to-secondary/10 blur-xl opacity-80" aria-hidden />
              <div className="relative rounded-3xl border border-white/10 bg-primary/75 px-8 py-10 sm:px-12 sm:py-12 backdrop-blur-xl shadow-hero">
                <div className="text-[10px] font-semibold uppercase tracking-[0.35em] text-secondary">You made it</div>
                <div className="mt-3 font-brand text-5xl sm:text-7xl lg:text-8xl leading-none text-secondary drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
                  WELCOME IN
                </div>
                <p className="mt-4 text-sm sm:text-base text-white/90 max-w-md mx-auto leading-relaxed">
                  You&apos;re inside Campus Merch. Pick a rack and shop like you&apos;re on campus.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/category/apparels"
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-secondary text-secondary-foreground rounded-full font-bold hover:scale-[1.02] transition-transform shadow-glow"
                  >
                    Browse Apparels
                  </Link>
                  <Link
                    to="/category/accessories"
                    className="inline-flex items-center justify-center px-7 py-3.5 bg-white/10 text-white border border-white/35 rounded-full font-semibold hover:bg-white/15 transition-colors"
                  >
                    Accessories &amp; Drinkware
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scroll hint */}
        {progress < 0.05 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 rounded-full border border-white/15 bg-black/40 px-5 py-3 backdrop-blur-md">
            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">Scroll to walk</span>
            <ChevronDown className="h-5 w-5 text-secondary animate-bounce" aria-hidden />
          </div>
        )}

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none rack-vignette" />
      </div>
    </section>
  );
}

function Layer({
  src,
  alt,
  opacity,
  style,
  imgClassName,
}: {
  src: string;
  alt: string;
  opacity: number;
  style?: React.CSSProperties;
  imgClassName?: string;
}) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-300 will-change-transform"
      style={{ opacity: Math.max(0, Math.min(1, opacity)), ...style }}
    >
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", imgClassName)}
        loading="eager"
        decoding="async"
        sizes="100vw"
      />
    </div>
  );
}

function DoorPanels({ progress }: { progress: number }) {
  if (progress <= 0) return null;
  const offset = progress * 55; // % translate
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
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
