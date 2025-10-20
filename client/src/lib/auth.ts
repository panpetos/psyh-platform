// client/src/lib/auth.ts
import { AuthUser } from "@/types";

let currentUser: AuthUser | null = null;
let authListeners: ((user: AuthUser | null) => void)[] = [];

// Универсальный парсер ответа API — поддерживает разные формы:
// { ok, data: [{...}] } ИЛИ { ok, data: { user: {...} } } ИЛИ { ok, data: {...} }
function parseUser(payload: any): AuthUser | null {
  const d = payload?.data;

  // 1) {data: [{...}]}
  const fromArray = Array.isArray(d) ? d[0] : null;

  // 2) {data: {user: {...}}}
  const fromUser = d?.user ?? null;

  // 3) {data: {...}}
  const fromObject = d && !Array.isArray(d) && !d.user ? d : null;

  const raw = fromArray ?? fromUser ?? fromObject ?? null;
  if (!raw) return null;

  return {
    id: Number(raw.id),
    email: String(raw.email ?? ""),
    name: String(raw.name ?? ""),
    role: (raw.role ?? "user") as AuthUser["role"],
  };
}

export const authService = {
  getCurrentUser(): AuthUser | null {
    return currentUser;
  },

  setCurrentUser(user: AuthUser | null) {
    currentUser = user;
    authListeners.forEach((listener) => listener(user));
  },

  onAuthChange(listener: (user: AuthUser | null) => void) {
    authListeners.push(listener);
    return () => {
      authListeners = authListeners.filter((l) => l !== listener);
    };
  },

  // Автовход по сессии
  async me(): Promise<AuthUser | null> {
    const r = await fetch("/api/auth/me", { credentials: "include" });
    const json = await r.json();
    const user = parseUser(json);
    this.setCurrentUser(user);
    return user;
  },

  // Логин
  async login(email: string, password: string): Promise<AuthUser> {
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const json = await r.json();
    if (!r.ok || json?.ok === false) {
      throw new Error(json?.error || "Ошибка входа");
    }

    const user = parseUser(json);
    if (!user) {
      throw new Error("Неверный ответ сервера (user)");
    }

    this.setCurrentUser(user);
    return user;
  },

  // Выход
  async logout(): Promise<void> {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    this.setCurrentUser(null);
  },
};
