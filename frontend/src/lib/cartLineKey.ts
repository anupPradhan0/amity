/** Stable key for a cart line (product + variant). */
export function cartLineKey(slug: string, size?: string, color?: string): string {
  return `${slug}::${size ?? ""}::${color ?? ""}`;
}
