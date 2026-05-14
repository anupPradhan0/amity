import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "@/components/ui/label.tsx";
import { Loader2, Lock } from "lucide-react";
import { apiUrl } from "@/lib/apiUrl.ts";
import { getAccessToken, setAccessToken } from "@/lib/authToken.ts";

type LoginOk = {
  access_token?: string;
  user?: { id?: number; email?: string; is_admin?: boolean };
};

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  type LocState = { from?: string; reason?: string } | null | undefined;

  function safeAdminPath(p: unknown): string | undefined {
    if (typeof p !== "string" || !p.startsWith("/auth/admin")) return undefined;
    if (p.startsWith("/auth/admin/login")) return undefined;
    return p;
  }

  const from =
    safeAdminPath((location.state as LocState)?.from) ?? "/auth/admin";

  useEffect(() => {
    const t = getAccessToken();
    if (!t) return;
    let cancelled = false;
    fetchAuthMe(t)
      .then(me => {
        if (cancelled || !me.is_admin) return;
        navigate(from, { replace: true });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [from, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toastForReason = useRef<string | undefined>(undefined);

  useEffect(() => {
    const s = location.state as LocState;
    const reason = s?.reason;
    if (reason !== "not_admin" && reason !== "session") {
      toastForReason.current = undefined;
      return;
    }
    if (toastForReason.current === reason) return;
    toastForReason.current = reason;

    const preservedFrom = safeAdminPath(s?.from);

    if (reason === "not_admin") toast.error("Administrator access required.", { id: "admin-not-admin" });
    if (reason === "session") toast.message("Session expired. Sign in again.", { id: "admin-session" });

    navigate(location.pathname, {
      replace: true,
      state: preservedFrom ? { from: preservedFrom } : {},
    });
  }, [location.pathname, location.state, navigate]);

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

    try {
      const res = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = (await res.json().catch(() => ({}))) as LoginOk;

      if (!res.ok) {
        let msg = "Could not sign in. Try again.";
        if (typeof (data as { detail?: string }).detail === "string")
          msg = (data as { detail: string }).detail;
        else if (res.status === 401) msg = "Invalid email or password.";
        setFormError(msg);
        return;
      }

      const tok = typeof data.access_token === "string" ? data.access_token : "";
      if (!tok) {
        setFormError("Unexpected response from server.");
        return;
      }

      if (!data.user?.is_admin) {
        setFormError("This account is not an administrator.");
        return;
      }

      setAccessToken(tok);
      toast.success("Welcome to admin");
      navigate(from, { replace: true });
    } catch {
      setFormError(
        "Cannot reach the API. Ensure the backend is running and `VITE_API_URL` matches it when using Docker.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <img src="/amity-university-logo.png" alt="" className="h-10 w-auto" />
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campus Merch</p>
          <p className="font-display text-lg font-semibold">Admin sign in</p>
        </div>
      </div>

      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card-soft">
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
            <Label htmlFor="admin-signin-email">Email</Label>
            <input
              id="admin-signin-email"
              type="email"
              name="email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors(f => ({ ...f, email: undefined }));
              }}
              placeholder="admin@amity.edu"
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-secondary/60 focus:border-secondary ${
                fieldErrors.email ? "border-destructive" : "border-input"
              }`}
            />
            {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="admin-signin-password">Password</Label>
            <input
              id="admin-signin-password"
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
              className={`w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-secondary/60 focus:border-secondary ${
                fieldErrors.password ? "border-destructive" : "border-input"
              }`}
            />
            {fieldErrors.password && <p className="text-xs text-destructive">{fieldErrors.password}</p>}
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
              "Sign in to admin"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link to="/" className="font-semibold text-primary hover:underline">
            Back to store
          </Link>
        </p>
      </div>
    </div>
  );
}
