import PageShell from "@/components/PageShell";
import { Link } from "react-router-dom";

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Terms of service"
      intro="By using Campus Merch you agree to these terms. Please read them before you shop."
      crumbs={[{ label: "Home", to: "/" }, { label: "Terms" }]}
    >
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Use of the site</h2>
          <p>
            Campus Merch is provided for personal, non-commercial shopping of official merchandise. You agree not to misuse
            the site, scrape content without permission, or attempt to disrupt service.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Products &amp; pricing</h2>
          <p>
            We strive for accurate descriptions and images; colours may vary by screen. Prices and availability may change
            without notice until checkout is completed. Limited drops may have special conditions stated on the product page.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Orders &amp; payment</h2>
          <p>
            When you place an order, you offer to buy at the listed price. We may refuse or cancel orders in cases of error,
            fraud suspicion, or stock issues — we’ll notify you and refund if payment was taken.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Shipping &amp; returns</h2>
          <p>
            Delivery timelines are estimates. Risk of loss passes according to courier terms. Returns follow our{" "}
            <Link to="/shipping-returns" className="font-semibold text-primary cm-link">
              Shipping &amp; returns
            </Link>{" "}
            policy.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Campus Merch is not liable for indirect or consequential damages arising
            from use of the site or products. Nothing excludes liability that cannot be excluded under applicable law.
          </p>
        </section>
        <p className="text-xs text-muted-foreground/90 pt-4 border-t border-border">
          Last updated {new Date().getFullYear()}. Questions? See{" "}
          <Link to="/contact" className="font-semibold text-primary cm-link">
            Contact
          </Link>
          .
        </p>
      </div>
    </PageShell>
  );
}
