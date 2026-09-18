/**
 * Fetch wrapper for the Quizez API.
 *
 * Base URL resolution:
 * - Server Components / Route Handlers: `API_URL` (compose DNS, e.g. http://api:8080)
 * - Browser: `NEXT_PUBLIC_API_URL` (baked at build time)
 *
 * Auth: pass a JWT via `token` — the API sets it as an HttpOnly cookie after
 * login; read it server-side and forward. Never store tokens in localStorage.
 */

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`API request failed with status ${status}`);
    this.name = "ApiError";
  }
}

type ApiOptions = RequestInit & { token?: string };

function baseUrl(): string {
  const url =
    typeof window === "undefined"
      ? (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL)
      : process.env.NEXT_PUBLIC_API_URL;
  if (!url) throw new Error("API base URL is not configured");
  return url.replace(/\/$/, "");
}

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { token, headers, ...init } = options;
  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });
  const body = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, body);
  return body as T;
}
