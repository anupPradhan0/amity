import PageShell from "@/components/PageShell";

export default function SizeGuidePage() {
  return (
    <PageShell
      eyebrow="FIT"
      title="Size guide"
      intro="Measurements are in inches. If you’re between sizes, most learners size up for an oversized campus fit."
      crumbs={[{ label: "Home", to: "/" }, { label: "Size guide" }]}
      wide
    >
      <div className="space-y-10">
        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Tees &amp; polos</h2>
          <div className="overflow-x-auto rounded-xl border border-border shadow-card-soft">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Chest</th>
                  <th className="px-4 py-3 font-semibold">Length</th>
                  <th className="px-4 py-3 font-semibold">Sleeve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {[
                  ["XS", "34–36", "26", "7.5"],
                  ["S", "36–38", "27", "8"],
                  ["M", "38–40", "28", "8.5"],
                  ["L", "40–42", "29", "9"],
                  ["XL", "42–44", "30", "9.5"],
                  ["2XL", "44–46", "31", "10"],
                ].map(([size, chest, len, sleeve]) => (
                  <tr key={size} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{size}</td>
                    <td className="px-4 py-3 text-muted-foreground">{chest}</td>
                    <td className="px-4 py-3 text-muted-foreground">{len}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Hoodies &amp; sweatshirts</h2>
          <div className="overflow-x-auto rounded-xl border border-border shadow-card-soft">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Size</th>
                  <th className="px-4 py-3 font-semibold">Chest</th>
                  <th className="px-4 py-3 font-semibold">Length</th>
                  <th className="px-4 py-3 font-semibold">Shoulder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {[
                  ["S", "40–42", "26", "17"],
                  ["M", "42–44", "27", "18"],
                  ["L", "44–46", "28", "19"],
                  ["XL", "46–48", "29", "20"],
                  ["2XL", "48–50", "30", "21"],
                ].map(([size, chest, len, shoulder]) => (
                  <tr key={size} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{size}</td>
                    <td className="px-4 py-3 text-muted-foreground">{chest}</td>
                    <td className="px-4 py-3 text-muted-foreground">{len}</td>
                    <td className="px-4 py-3 text-muted-foreground">{shoulder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">How to measure:</strong> Chest — around the fullest part, under arms. Length — top of shoulder to hem.
          Hoodies are relaxed; for a closer fit, consider one size down.
        </section>
      </div>
    </PageShell>
  );
}
