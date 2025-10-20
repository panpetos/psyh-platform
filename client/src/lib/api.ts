export async function api<T>(path: string, init: RequestInit = {}) {
  const r = await fetch(`/api${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    ...init,
  });

  let body: any = null;
  try { body = await r.json(); } catch {}

  // Нормализуем успех
  if (r.ok && body?.ok !== false) {
    // допускаем как {ok:true,data} так и {user:...}
    const data = body?.data ?? body;
    return { ok: true, data } as { ok: true; data: T };
  }

  // Нормализуем ошибку под любые форматы
  const msg =
    body?.error ??
    body?.message ??
    body?.errors?.[0]?.message ??
    `HTTP ${r.status}`;
  throw new Error(msg);
}

// Готовые методы
export const Auth = {
  login: (email: string, password: string) =>
    api<{ id: number; email: string; name: string; role: string }>(
      '/auth/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    ),
  me: () => api<{ user: any }>('/auth/me'),
  logout: () => api<void>('/auth/logout', { method: 'POST' }),
};
