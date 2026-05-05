import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import { Lock } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.message("Sign-in preview", {
      description: "Accounts aren’t wired to a backend yet. Browse the store as a guest — cart & wishlist still work on this device.",
    });
  }

  return (
    <PageShell
      eyebrow="ACCOUNT"
      title="Sign in"
      intro="Learner accounts are coming soon. For now, shop as a guest — your bag is saved in the browser."
      crumbs={[{ label: "Home", to: "/" }, { label: "Sign in" }]}
    >
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card-soft">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 ring-1 ring-secondary/30 mb-6">
          <Lock className="h-6 w-6 text-secondary" aria-hidden />
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="signin-email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@amity.edu"
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary"
              autoComplete="email"
            />
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="signin-password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <button type="button" className="text-xs font-semibold text-primary hover:underline" onClick={() => toast.message("Password reset", { description: "Use contact form for account help until sign-in goes live." })}>
                Forgot password?
              </button>
            </div>
            <input
              id="signin-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/60 focus:border-secondary"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-bold hover:scale-[1.01] active:scale-[0.99] transition-transform shadow-glow"
          >
            Sign in
          </button>
        </form>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          New to Campus Merch?{" "}
          <Link to="/" className="font-semibold text-primary cm-link">
            Continue shopping
          </Link>
        </p>
      </div>
    </PageShell>
  );
}
