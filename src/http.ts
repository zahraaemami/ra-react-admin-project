// src/http.ts
export const API_BASE = import.meta.env.VITE_API_URL || 'https://api.kheradedu.com/api/v1';

type FetchOptions = RequestInit & { retry?: boolean };

async function doRefreshToken(): Promise<string> {
  const refresh = localStorage.getItem('refresh');
  if (!refresh) throw new Error('no-refresh-token');

  const res = await fetch(`${API_BASE}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    // Refresh failed — پاکسازی توکن‌ها
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    throw new Error(`refresh-failed:${res.status}`);
  }

  const json = await res.json();
  if (!json.access) {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    throw new Error('refresh-no-access');
  }

  localStorage.setItem('access', json.access);
  return json.access;
}

/**
 * http: wrapper برای fetch که:
 *  - هدر Authorization را از localStorage می‌گذارد
 *  - در صورت 401 یکبار سعی می‌کند refresh کند و درخواست را دوباره بفرستد
 *  - در صورت failureِ refresh، خطا را پرتاب می‌کند (تا authProvider لاگ‌اوت کند)
 */
export async function http(url: string, options: FetchOptions = {}): Promise<Response> {
  const opts: RequestInit = { ...options };
  opts.headers = opts.headers instanceof Headers ? opts.headers : new Headers(opts.headers as any || {});

  // مطمئن شو Content-Type برای ارسال JSON تنظیم است مگر وقتی فایل میفرستی
  if (!(opts.headers as Headers).has('Accept')) {
    (opts.headers as Headers).set('Accept', 'application/json');
  }

  const access = localStorage.getItem('access');
  if (access) {
    (opts.headers as Headers).set('Authorization', `Bearer ${access}`);
  }

  let res = await fetch(url, opts);

  // اگر 401 گرفتیم و گزینه retry صریحاً false نیست -> سعی می‌کنیم refresh کنیم
  if (res.status === 401 && options.retry !== false) {
    try {
      // refresh token بزن
      await doRefreshToken();
      // بعد از ریفرش، توکن جدید توی localStorage هست — هدر را بروز کن و دوباره بفرست
      const newAccess = localStorage.getItem('access');
      if (newAccess) {
        (opts.headers as Headers).set('Authorization', `Bearer ${newAccess}`);
      } else {
        // اگر همچنان توکنی نیست، اجازه بده این به عنوان خطای auth شناخته شود
        throw new Error('no-access-after-refresh');
      }

      // مطمئن شو این درخواست فقط یکبار ری‌ترای شده و دوباره 401 دوباره ریفرش نزنه (جلوگیری از loop)
      res = await fetch(url, { ...opts, // @ts-ignore
        retry: false } as any);
    } catch (err) {
      // اگر ریفرش موفق نبود، خطا را بالا می‌فرستیم تا authProvider بدان پاسخ دهد (logout)
      throw err;
    }
  }

  return res;
}