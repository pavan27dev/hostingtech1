/**
 * Thin fetch wrapper for the REST backend (Spring Boot).
 *
 * - Base URL comes from VITE_API_BASE_URL (public config, no secrets).
 * - Auth tokens (JWT) are attached by `setAuthToken` — intended for the future
 *   admin app. They are kept in memory only; persist them via httpOnly cookies
 *   on the backend when authentication is implemented.
 * - All errors are normalised into `ApiError`.
 */

export class ApiError extends Error {
  status: number
  details?: unknown
  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')

let authToken: string | null = null
export const setAuthToken = (token: string | null) => {
  authToken = token
}

/** True when a backend URL has been configured */
export const isApiConfigured = () => Boolean(import.meta.env.VITE_API_BASE_URL)

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  timeoutMs?: number
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, timeoutMs = 15000, headers, ...rest } = options
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...rest,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })

    const isJson = res.headers.get('content-type')?.includes('application/json')
    const payload = isJson ? await res.json().catch(() => null) : null

    if (!res.ok) {
      throw new ApiError(payload?.message || `Request failed with status ${res.status}`, res.status, payload)
    }
    return (payload?.data ?? payload) as T
  } catch (err) {
    if (err instanceof ApiError) throw err
    if ((err as Error).name === 'AbortError') throw new ApiError('Request timed out', 408)
    throw new ApiError((err as Error).message || 'Network error', 0)
  } finally {
    clearTimeout(timer)
  }
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>(path, { ...options, method: 'DELETE' }),
}
