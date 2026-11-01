import { config } from "@/lib/config";
import type { ApiErrorBody } from "@/types/api";

/** Error tipado con el cuerpo que devuelve la API. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body?: ApiErrorBody,
  ) {
    super(body?.message ?? `Error ${status}`);
    this.name = "ApiError";
  }

  get fieldErrors(): Record<string, string> {
    return Object.fromEntries((this.body?.fieldErrors ?? []).map((f) => [f.field, f.message]));
  }
}

type TokenGetter = () => string | null;
type UnauthorizedHandler = () => void;

let getToken: TokenGetter = () => null;
let onUnauthorized: UnauthorizedHandler = () => {};

/** Lo llama AuthProvider para conectar el token y el cierre de sesión. */
export function configureApiClient(options: { getToken: TokenGetter; onUnauthorized: UnauthorizedHandler }) {
  getToken = options.getToken;
  onUnauthorized = options.onUnauthorized;
}

type Query = Record<string, string | number | boolean | undefined | null>;

interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  query?: Query;
}

function buildUrl(path: string, query?: Query): string {
  const url = new URL(config.apiUrl.replace(/\/$/, "") + path);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") url.searchParams.set(key, String(value));
  });
  return url.toString();
}

export async function apiFetch<T>(path: string, { body, query, headers, ...init }: RequestOptions = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(buildUrl(path, query), {
    ...init,
    headers: {
      Accept: "application/json",
      ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401 && token) onUnauthorized();

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => undefined)) as ApiErrorBody | undefined;
    throw new ApiError(response.status, errorBody);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const api = {
  get: <T>(path: string, query?: Query) => apiFetch<T>(path, { method: "GET", query }),
  post: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "POST", body }),
  put: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "PUT", body }),
  patch: <T>(path: string, body?: unknown) => apiFetch<T>(path, { method: "PATCH", body }),
  delete: (path: string) => apiFetch<void>(path, { method: "DELETE" }),
};
