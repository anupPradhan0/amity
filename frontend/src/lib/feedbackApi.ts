import { apiUrl } from "@/lib/apiUrl.ts";

/** A single product review from the API. */
export type Review = {
  id: number;
  author_name: string;
  rating: number;
  title: string | null;
  body: string;
  created_at: string;
};

export type ReviewInput = {
  author_name: string;
  rating: number;
  title?: string;
  body: string;
};

/** Extract a human-readable error message from a FastAPI error response. */
async function errorMessage(res: Response, fallback: string): Promise<string> {
  const data = (await res.json().catch(() => null)) as
    | { detail?: unknown; message?: string }
    | null;
  const detail = data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail[0] && typeof detail[0] === "object" && "msg" in detail[0]) {
    return String((detail[0] as { msg: string }).msg);
  }
  if (typeof data?.message === "string") return data.message;
  return fallback;
}

export async function fetchReviews(slug: string): Promise<Review[]> {
  const res = await fetch(apiUrl(`/products/${encodeURIComponent(slug)}/reviews`), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Could not load reviews."));
  return res.json() as Promise<Review[]>;
}

export async function postReview(slug: string, input: ReviewInput): Promise<Review> {
  const res = await fetch(apiUrl(`/products/${encodeURIComponent(slug)}/reviews`), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Could not submit your review."));
  return res.json() as Promise<Review>;
}

export async function subscribeNewsletter(email: string): Promise<string> {
  const res = await fetch(apiUrl("/newsletter"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Could not subscribe. Try again."));
  const data = (await res.json()) as { detail?: string };
  return data.detail ?? "Subscribed!";
}

export type ContactInput = {
  name: string;
  email: string;
  topic: string;
  message: string;
};

export async function sendContactMessage(input: ContactInput): Promise<string> {
  const res = await fetch(apiUrl("/contact"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(await errorMessage(res, "Could not send your message. Try again."));
  const data = (await res.json()) as { detail?: string };
  return data.detail ?? "Message sent.";
}
