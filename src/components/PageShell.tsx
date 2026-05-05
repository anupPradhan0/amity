import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; to?: string };

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  crumbs?: Crumb[];
  /** Wider content column (e.g. size tables). */
  wide?: boolean;
  className?: string;
};

export default function PageShell({ eyebrow, title, intro, children, crumbs, wide, className }: Props) {
  return (
    <main className={cn(className)}>
      <section className="border-b border-border/70 bg-gradient-to-b from-muted/50 via-muted/25 to-background">
        <div className="container pt-14 sm:pt-16 pb-10 sm:pb-12">
          {crumbs && crumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-1 gap-y-1 text-xs text-muted-foreground mb-6">
              {crumbs.map((c, i) => (
                <span key={`${c.label}-${i}`} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 opacity-70" aria-hidden />}
                  {c.to ? (
                    <Link to={c.to} className="hover:text-primary transition-colors">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">{c.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <div className="inline-block text-secondary-foreground bg-secondary text-[10px] tracking-[0.28em] font-bold px-3.5 py-1.5 rounded-full shadow-sm">
            {eyebrow}
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-5 tracking-tight text-foreground leading-tight">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">{intro}</p>
          )}
        </div>
      </section>
      <div className="container py-12 lg:py-16">
        <div className={cn("mx-auto", wide ? "max-w-5xl" : "max-w-3xl")}>{children}</div>
      </div>
    </main>
  );
}
