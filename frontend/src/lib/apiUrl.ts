/**
 * Build the URL for an API path.
 *
 * - **Development:** always uses `/api/...` so Vite can proxy to the backend (same origin, no CORS).
 * - **Production:** uses `VITE_API_URL` when it is an absolute URL; otherwise same-origin `/api/...`.
 */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const raw = import.meta.env.VITE_API_URL?.trim() ?? "";

  if (import.meta.env.DEV) {
    return `/api${p}`;
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return `${raw.replace(/\/$/, "")}${p}`;
  }

  return `/api${p}`;
}
