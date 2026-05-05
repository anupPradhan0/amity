import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import { PackageSearch } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) {
      toast.error("Enter your order ID and email.");
      return;
    }
    toast.message("Demo checkout", {
      description:
        "Order tracking isn’t connected to a live backend yet. You’ll see live status here once orders ship from Campus Merch.",
    });
  }

  return (
    <PageShell
      eyebrow="ORDERS"
      title="Track your order"
      intro="Enter the order number from your confirmation email and the email you used at checkout."
      crumbs={[{ label: "Home", to: "/" }, { label: "Track order" }]}
    >
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card-soft">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 ring-1 ring-secondary/30 mb-6">
          <PackageSearch className="h-6 w-6 text-secondary" aria-hidden />
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="order-id" className="text-sm font-medium text-foreground">
              Order ID
            </label>
            <input
              id="order-id"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              placeholder="e.g. CM-2026-18492"
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary transition-shadow"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="track-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="track-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@amity.edu"
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary transition-shadow"
              autoComplete="email"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-glow"
          >
            Track shipment
          </button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
          Order IDs look like <span className="font-mono text-foreground">CM-YYYY-#####</span> and are sent within minutes of payment.
          Need help?{" "}
          <Link to="/contact" className="font-semibold text-primary cm-link inline">
            Contact us
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
