// client/src/lib/auth.ts
import type { AuthUser } from "@/types";

/**
 * Простенький клиент для /api/auth/*
 * — всегда шлём credentials: 'include' (чтобы ходили куки сессии)
 * — после login/register дёргаем fetchMe(), чтобы фронт "узнал" пользователя
 */

let currentUser: AuthUser | null = null;
const listeners: Array<(u: AuthUser | null) => void> = [];

function notify() {
  for (const l of listeners) l(currentUser);
}

async function jsonFetch<T = any>(
  url: string,
  init: RequestInit = {}
): Promise<{ ok: boolean; status: number; data: T | any; error?: string }> {
  const res = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    ...init,
  });

  const data = await res
    .json()
    .catch(() => ({} as any)); // на случай пустых ответов

  // у наших эндпоинтов ok=true/false внутри JSON
  const ok = res.ok && (data?.ok ?? true) !== false;
  return { ok, status: res.status, data, error: data?.error };
}

export const authService = {
  getCurrentUser() {
    return currentUser;
  },

  onAuthChange(fn: (u: AuthUser | null) => void) {
    listeners.push(fn);
    return () => {
      const i = listeners.indexOf(fn);
      if (i !== -1) listeners.splice(i, 1);
    };
  },

  async fetchMe() {
    const { ok, data } = await jsonFetch("/api/auth/me");
    if (ok && data?.data?.user) {
      currentUser = data.data.user as AuthUser;
    } else {
      currentUser = null;
    }
    notify();
    return currentUser;
  },

  async login(payload: { email: string; password: string }) {
    const { ok, error } = await jsonFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!ok) return { ok: false, error: error || "Не удалось войти" };
    await this.fetchMe();
    return { ok: true as const };
  },

  async register(payload: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: "client" | "psychologist";
  }) {
    const { ok, error } = await jsonFetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!ok) return { ok: false, error: error || "Не удалось зарегистрироваться" };
    await this.fetchMe();
    return { ok: true as const };
  },

  async logout() {
    await jsonFetch("/api/auth/logout", { method: "POST" });
    currentUser = null;
    notify();
  },
};
