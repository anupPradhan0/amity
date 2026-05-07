import { apiUrl } from "@/lib/apiUrl.ts";
import { clearAccessToken, getAccessToken } from "@/lib/authToken.ts";

export type AuthUserMe = {
  id: number;
  email: string;
  is_admin: boolean;
};

/** Require a stored token and return it, or null if missing. */
export function requireStoredAccessToken(): string | null {
  const t = getAccessToken();
  return t && t.length > 0 ? t : null;
}

export async function fetchAuthMe(accessToken: string): Promise<AuthUserMe> {
  const res = await fetch(apiUrl("/auth/me"), {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
  });

  if (!res.ok) throw new Error("Unauthorized.");

  const data = (await res.json()) as AuthUserMe;
  if (typeof data.is_admin !== "boolean") throw new Error("Bad response.");
  return data;
}

/** Clear token when session is invalid (401 / network auth failure). */
export function clearSession(): void {
  clearAccessToken();
}
