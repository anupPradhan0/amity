import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PageShell from "@/components/PageShell";
import { Label } from "@/components/ui/label";
import { Lock, Loader2 } from "lucide-react";

const apiBase = import.meta.env.VITE_API_URL as string | undefined;

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const next: typeof fieldErrors = {};
    const trimmed = email.trim();
    if (!trimmed) next.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    else if (password.length < 8) next.password = "Password must be at least 8 characters.";
    setFieldErrors(next);
    setFormError(null);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFormError(null);

    if (!apiBase || !apiBase.startsWith("http")) {
      setIsSubmitting(false);
      toast.info("Sign-in API not configured", {
        description: "Set VITE_API_URL when your backend is ready.",
        duration: 5000,
      });
      return;
    }

    try {
      const res = await fetch(`${apiBase.replace(/\/$/, "")}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        let msg = "Could not sign in. Try again.";
        if (typeof data?.detail === "string") msg = data.detail;
        else if (Array.isArray(data?.detail) && data.detail[0] && typeof data.detail[0] === "object" && "msg" in data.detail[0])
          msg = String((data.detail[0] as { msg: string }).msg);
        else if (typeof data?.message === "string") msg = data.message;
        else if (res.status === 401) msg = "Invalid email or password.";
        setFormError(msg);
        return;
      }

      toast.success("Welcome back");
      navigate("/", { replace: true });
    } catch {
      setFormError("Cannot reach the server. Check VITE_API_URL and that the API is running.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <PageShell
      eyebrow="ACCOUNT"
      title="Sign in"
      intro="Use your Amity email. Password must be at least 8 characters."
      crumbs={[{ label: "Home", to: "/" }, { label: "Sign in" }]}
    >
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card-soft">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/15 ring-1 ring-secondary/30 mb-6">
          <Lock className="h-6 w-6 text-secondary" aria-hidden />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {formError && (
            <div
              role="alert"
              className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {formError}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="signin-email">Email</Label>
            <input
              id="signin-email"
              type="email"
              name="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors(f => ({ ...f, email: undefined }));
              }}
              placeholder="you@amity.edu"
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "signin-email-error" : undefined}
              className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-secondary/60 focus:border-secondary ${
                fieldErrors.email ? "border-destructive" : "border-input"
              }`}
            />
            {fieldErrors.email && (
              <p id="signin-email-error" className="text-xs text-destructive">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Label htmlFor="signin-password">Password</Label>
              <Link
                to="/contact"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Need help?
              </Link>
            </div>
            <input
              id="signin-password"
              type="password"
              name="password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                if (fieldErrors.password) setFieldErrors(f => ({ ...f, password: undefined }));
              }}
              placeholder="••••••••"
              autoComplete="current-password"
              minLength={8}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "signin-password-error" : undefined}
              className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-secondary/60 focus:border-secondary ${
                fieldErrors.password ? "border-destructive" : "border-input"
              }`}
            />
            {fieldErrors.password && (
              <p id="signin-password-error" className="text-xs text-destructive">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-secondary text-secondary-foreground font-bold hover:scale-[1.01] active:scale-[0.99] transition-transform shadow-glow disabled:opacity-60 disabled:pointer-events-none disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
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
