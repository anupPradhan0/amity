import { useEffect, useState } from "react";

const SESSION_KEY = "cm-amity-logo-splash";

/**
 * Shows the Amity University logo full-screen briefly on first visit per browser tab session.
 */
export default function BrandSplash() {
  const [visible, setVisible] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem(SESSION_KEY),
  );
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (!visible) return;
    const fade = window.setTimeout(() => setOpacity(0), 950);
    const done = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
    }, 1350);
    return () => {
      clearTimeout(fade);
      clearTimeout(done);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-hero-gradient px-6 transition-opacity duration-[400ms] ease-out grain"
      style={{ opacity }}
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-spotlight opacity-70 pointer-events-none" aria-hidden />
      <img
        src="/amity-university-logo.png"
        alt="Amity University"
        width={280}
        height={320}
        className="relative max-h-[min(42vh,220px)] w-auto object-contain drop-shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
        fetchPriority="high"
      />
      <p className="relative text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-secondary">
        Campus Merch
      </p>
    </div>
  );
}
