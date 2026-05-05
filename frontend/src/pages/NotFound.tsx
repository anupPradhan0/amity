import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-[70vh] flex items-center bg-gradient-to-b from-muted/40 to-background border-b border-border/60">
      <div className="container py-20 text-center">
        <div className="inline-block text-secondary-foreground bg-secondary text-[10px] tracking-[0.28em] font-bold px-3 py-1.5 rounded-full mb-6">
          LOST ON CAMPUS
        </div>
        <h1 className="font-display text-6xl sm:text-8xl font-bold text-foreground tracking-tight">404</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto">
          This page doesn&apos;t exist — maybe it graduated or moved racks.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-10 px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-bold hover:scale-[1.02] transition-transform shadow-glow"
        >
          <Home className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
