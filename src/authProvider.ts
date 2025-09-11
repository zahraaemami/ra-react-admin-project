// src/authProvider.ts
import { AuthProvider } from 'react-admin';
import { API_BASE } from './http';

export const authProvider: AuthProvider = {
  // داده ورودی از فرم لاگین react-admin: { username, password }
  login: async (params) => {
    const { username, password } = params as { username: string; password: string };
    const res = await fetch(`${API_BASE}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`Login failed: ${res.status} ${txt}`);
    }

    const json = await res.json();
    // انتظار: { access, refresh }
    if (!json.access || !json.refresh) {
      throw new Error('Login response missing tokens');
    }

    localStorage.setItem('access', json.access);
    localStorage.setItem('refresh', json.refresh);

    return Promise.resolve();
  },

  logout: async () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    return Promise.resolve();
  },

  checkAuth: async () => {
    const access = localStorage.getItem('access');
    if (access) return Promise.resolve();
    return Promise.reject();
  },

  // react-admin وقتی پاسخ با خطای 401/403 گرفت این متد را صدا می‌زند
  checkError: async (error) => {
    // error ممکن است یک Error معمولی یا Response باشد؛ react-admin اغلب status را از error.status می‌خواند
    const status = (error && (error.status || (error as any).response?.status)) ?? null;

    if (status === 401 || status === 403) {
      // اگر refresh قابل انجام باشد، باید قبل از reject تلاش کنیم؛
      // ولی چون ما در http.ts خودمان تلاش ریفرش را انجام داده‌ایم، اگر اینجا رسیدیم، یعنی refresh هم شکست خورده.
      // پس حذف توکن و reject
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      return Promise.reject();
    }

    return Promise.resolve();
  },

  getPermissions: async () => Promise.resolve(),
};