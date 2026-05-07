import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearSession, fetchAuthMe, requireStoredAccessToken } from "@/lib/authApi.ts";

export default function AdminAuthGuard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const token = requireStoredAccessToken();
      if (!token) {
        navigate("/auth/admin/login", {
          replace: true,
          state: { from: `${location.pathname}${location.search}` },
        });
        return;
      }

      try {
        const me = await fetchAuthMe(token);
        if (cancelled) return;

        if (!me.is_admin) {
          clearSession();
          navigate("/auth/admin/login", {
            replace: true,
            state: {
              reason: "not_admin" as const,
              from: `${location.pathname}${location.search}`,
            },
          });
          return;
        }

        setReady(true);
      } catch {
        if (cancelled) return;
        clearSession();
        navigate("/auth/admin/login", {
          replace: true,
          state: {
            reason: "session" as const,
            from: `${location.pathname}${location.search}`,
          },
        });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [navigate, location.pathname, location.search]);

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" aria-hidden />
        <span className="sr-only">Checking admin access…</span>
      </div>
    );
  }

  return <Outlet />;
}
