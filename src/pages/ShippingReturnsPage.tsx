import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import { Clock, Package, RefreshCcw, Truck } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <PageShell
      eyebrow="POLICIES"
      title="Shipping & returns"
      intro="How we get merch to you — and how to send something back if it’s not right."
      crumbs={[{ label: "Home", to: "/" }, { label: "Shipping & returns" }]}
    >
      <div className="space-y-12">
        <section className="grid sm:grid-cols-2 gap-4">
          {[
            { Icon: Truck, t: "Free shipping on orders ₹999+ across India." },
            { Icon: Clock, t: "Most orders pack within 1–2 business days." },
            { Icon: Package, t: "Track from your email once the label is generated." },
            { Icon: RefreshCcw, t: "7-day returns for unworn items with tags." },
          ].map(({ Icon, t }, i) => (
            <div
              key={i}
              className="flex gap-3 rounded-2xl border border-border/80 bg-card p-4 shadow-card-soft"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-sm leading-relaxed text-foreground/90 pt-0.5">{t}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground border-b border-border pb-2">Shipping</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-5">
            <li>Standard delivery: 3–7 business days after dispatch (metro &amp; tier-1 cities often faster).</li>
            <li>We ship with trusted national couriers; you’ll get SMS and email updates.</li>
            <li>₹99 flat shipping below ₹999 — free at ₹999 and above.</li>
            <li>Campus pick-up may be offered for select Noida events — follow @AmityCampusMerch for dates.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground border-b border-border pb-2">Returns &amp; exchanges</h2>
          <ul className="mt-4 space-y-2 text-muted-foreground list-disc pl-5">
            <li>7 days from delivery to start a return — item must be unworn, with tags and original packaging.</li>
            <li>Start from your order email or{" "}
              <Link to="/contact" className="font-semibold text-primary cm-link">contact us</Link> with your order ID.
            </li>
            <li>Refunds go to the original payment method within 7–10 business days after we receive the parcel.</li>
            <li>Wrong size? Exchange subject to stock — we’ll help you pick another size or colour.</li>
          </ul>
        </section>

        <p className="text-sm text-muted-foreground rounded-xl bg-muted/50 border border-border px-4 py-3">
          Full policy details live here for transparency; campus merch drops may have limited-return stickers — check product pages.
        </p>
      </div>
    </PageShell>
  );
}
