/**
 * Simple in-memory rate limit (per server instance): at most `limit` requests per `windowMs` per key.
 * Good enough for one container; replace with a shared store if the site runs on several instances.
 */
const hits = new Map<string, number[]>()

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}
