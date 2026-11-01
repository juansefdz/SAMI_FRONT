"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { configureApiClient } from "@/lib/api/client";
import { authApi } from "@/lib/api/services";
import type { AuthResponse, LoginRequest, RegisterRequest, Role, User } from "@/types/api";

const STORAGE_KEY = "sami.session";

interface Session {
  token: string;
  expiresAt: number;
  user: User;
}

interface AuthContextValue {
  user: User | null;
  /** false hasta leer la sesión guardada (evita parpadeos de redirección). */
  ready: boolean;
  login: (body: LoginRequest) => Promise<User>;
  register: (body: RegisterRequest) => Promise<User>;
  logout: () => void;
  /** Inicia sesión con una respuesta de auth ya obtenida (p. ej. solicitud sin cuenta). */
  startSession: (response: AuthResponse) => User;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Session;
    return session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

function writeSession(session: Session | null) {
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignorar
  }
}

// Variable de módulo para que el cliente HTTP lea el token sin re-renderizar.
let currentToken: string | null = null;

/** Token actual, para clientes que no pasan por fetch (WebSocket). */
export function getAccessToken(): string | null {
  return currentToken;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const logout = useCallback(() => {
    currentToken = null;
    writeSession(null);
    setUser(null);
  }, []);

  useEffect(() => {
    configureApiClient({ getToken: () => currentToken, onUnauthorized: logout });
    const session = readSession();
    if (session) {
      currentToken = session.token;
      setUser(session.user);
    }
    setReady(true);
  }, [logout]);

  const start = useCallback((response: AuthResponse) => {
    const session: Session = {
      token: response.accessToken,
      expiresAt: Date.now() + response.expiresIn * 1000,
      user: response.user,
    };
    currentToken = session.token;
    writeSession(session);
    setUser(session.user);
    return session.user;
  }, []);

  const login = useCallback(async (body: LoginRequest) => start(await authApi.login(body)), [start]);
  const register = useCallback(async (body: RegisterRequest) => start(await authApi.register(body)), [start]);

  const value = useMemo(
    () => ({ user, ready, login, register, logout, startSession: start }),
    [user, ready, login, register, logout, start],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}

/** Ruta de inicio según el rol. */
export function homeForRole(role: Role): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "DRIVER":
    case "EMT":
      return "/ambulance";
    default:
      return "/client";
  }
}
