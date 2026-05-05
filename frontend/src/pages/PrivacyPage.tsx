import PageShell from "@/components/PageShell";

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="LEGAL"
      title="Privacy policy"
      intro="How Campus Merch collects, uses, and protects your information when you shop with us."
      crumbs={[{ label: "Home", to: "/" }, { label: "Privacy" }]}
    >
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Information we collect</h2>
          <p>
            When you place an order, sign up for updates, or contact us, we may collect your name, email, phone number,
            shipping address, payment reference (we never store full card numbers on our servers), and order history.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">How we use it</h2>
          <p>
            We use this information to fulfil orders, send confirmations and tracking, respond to support requests,
            improve our products, and — only if you opt in — send marketing about drops and campus stories.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Cookies &amp; analytics</h2>
          <p>
            We use essential cookies for cart and session functionality. Optional analytics help us understand how learners
            use the site; you can control cookies in your browser settings.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Retention &amp; security</h2>
          <p>
            We retain order data as required for accounting and consumer law. We implement reasonable technical and
            organisational measures to protect personal data.
          </p>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-foreground mb-3">Your rights</h2>
          <p>
            Depending on applicable law, you may request access, correction, or deletion of personal data. Contact us with
            your request and we’ll respond within a reasonable time.
          </p>
        </section>
        <p className="text-xs text-muted-foreground/90 pt-4 border-t border-border">
          Last updated {new Date().getFullYear()}. For questions: refer to our Contact page.
        </p>
      </div>
    </PageShell>
  );
}
