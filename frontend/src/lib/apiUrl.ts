/**
 * Build the URL for an API path.
 *
 * - If `VITE_API_URL` is an absolute URL (typical in Docker Compose), use it from the browser.
 * - Otherwise in dev, use `/api/...` so Vite proxies to the local backend.
 * - In production builds without `VITE_API_URL`, fall back to same-origin `/api/...`.
 */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const raw = import.meta.env.VITE_API_URL?.trim() ?? "";

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return `${raw.replace(/\/$/, "")}${p}`;
  }

  if (import.meta.env.DEV) {
    return `/api${p}`;
  }

  return `/api${p}`;
}
