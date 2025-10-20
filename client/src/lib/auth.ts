import { AuthUser } from "@/types";

// локальное состояние
let currentUser: AuthUser | null = null;
let authListeners: ((user: AuthUser | null) => void)[] = [];

// универсальный API-запрос
async function api<T>(path: string, init: RequestInit = {}) {
  const r = await fetch(`/api${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });

  let body: any = null;
  try { body = await r.json(); } catch {}

  if (r.ok && body?.ok !== false) {
    const data = body?.data ?? body;
    return { ok: true, data } as { ok: true; data: T };
  }

  const msg =
    body?.error ??
    body?.message ??
    body?.errors?.[0]?.message ??
    `HTTP ${r.status}`;
  throw new Error(msg);
}

// экспортируем authService (как раньше)
export const authService = {
  getCurrentUser(): AuthUser | null {
    return currentUser;
  },

  setCurrentUser(user: AuthUser | null) {
    currentUser = user;
    authListeners.forEach(listener => listener(user));
  },

  onAuthChange(listener: (user: AuthUser | null) => void) {
    authListeners.push(listener);
    return () => {
      authListeners = authListeners.filter(l => l !== listener);
    };
  },

  // ✅ вход
  async login(email: string, password: string): Promise<AuthUser> {
    const { data } = await api<AuthUser>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setCurrentUser(data);
    return data;
  },

  // ✅ выход
  async logout(): Promise<void> {
    await api('/auth/logout', { method: 'POST' });
    this.setCurrentUser(null);
  },

  // ✅ проверка авторизации
  async fetchUser(): Promise<AuthUser | null> {
    const { data } = await api<{ user: AuthUser | null }>('/auth/me');
    this.setCurrentUser(data.user ?? null);
    return data.user ?? null;
  },
};
