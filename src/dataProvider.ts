// src/dataProvider.ts
import { DataProvider, GetListParams, GetOneParams, CreateParams, UpdateParams, DeleteParams, GetManyParams, GetManyReferenceParams, UpdateManyParams, DeleteManyParams } from 'react-admin';
import { http, API_BASE } from './http';

function buildUrl(resource: string, id?: string | number) {
  // resource مثال: "base/city"
  const base = `${API_BASE}/${resource}`;
  return id != null ? `${base}/${id}/` : `${base}/`;
}

const dataProvider: DataProvider = {
  // GET LIST
  getList: async (resource: string, params: GetListParams) => {
    // برای ساده بودن: بدون پیجینیشن/فیلتر خاص؛ اگر خواستی پارامترها را تبدیل می‌کنم
    const url = buildUrl(resource);
    const res = await http(url, { method: 'GET' });
    if (!res.ok) throw { status: res.status, message: await res.text() };

    const json = await res.json();
    const data = Array.isArray(json) ? json : (json.results || []);
    const total = Array.isArray(json) ? json.length : (json.count ?? data.length);
    return { data, total };
  },

  // GET ONE
  getOne: async (resource: string, params: GetOneParams) => {
    const url = buildUrl(resource, params.id);
    const res = await http(url, { method: 'GET' });
    if (!res.ok) throw { status: res.status, message: await res.text() };
    const json = await res.json();
    return { data: json };
  },

  // CREATE
  create: async (resource: string, params: CreateParams) => {
    const url = buildUrl(resource);
    const res = await http(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params.data),
    });
    if (!res.ok) throw { status: res.status, message: await res.text() };
    const json = await res.json();
    return { data: json };
  },

  // UPDATE (PUT)
  update: async (resource: string, params: UpdateParams) => {
    const url = buildUrl(resource, params.id);
    const res = await http(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params.data),
    });
    if (!res.ok) throw { status: res.status, message: await res.text() };
    const json = await res.json();
    return { data: json };
  },

  // DELETE
  delete: async (resource: string, params: DeleteParams) => {
    const url = buildUrl(resource, params.id);
    const res = await http(url, { method: 'DELETE' });
    // برخی APIها 204 برمیگردونن و body ندارن
    if (!res.ok && res.status !== 204) throw { status: res.status, message: await res.text() };
    return { data: { id: params.id } };
  },

  // GET MANY
  getMany: async (resource: string, params: GetManyParams) => {
    const promises = params.ids.map((id) =>
      http(buildUrl(resource, id), { method: 'GET' }).then(async (r) => {
        if (!r.ok) throw { status: r.status, message: await r.text() };
        return r.json();
      })
    );
    const data = await Promise.all(promises);
    return { data };
  },

  // GET MANY REFERENCE — برای simplicity همان getList برمی‌گردد (نیاز به map پارامترهای react-admin دارد در صورت صفحه‌بندی)
  getManyReference: async (resource: string, params: GetManyReferenceParams) => {
    // اگر backend از query params برای فیلتر پشتیبانی می‌کند می‌توان با params استفاده کرد.
    const url = buildUrl(resource);
    const res = await http(url, { method: 'GET' });
    if (!res.ok) throw { status: res.status, message: await res.text() };
    const json = await res.json();
    const data = Array.isArray(json) ? json : (json.results || []);
    const total = Array.isArray(json) ? json.length : (json.count ?? data.length);
    return { data, total };
  },

  // UPDATE MANY — انجام چند PUT به طور همزمان
  updateMany: async (resource: string, params: UpdateManyParams) => {
    const promises = params.ids.map((id) =>
      http(buildUrl(resource, id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params.data),
      }).then(async (r) => {
        if (!r.ok) throw { status: r.status, message: await r.text() };
        return r.json();
      })
    );
    const results = await Promise.all(promises);
    return { data: results.map((r) => r.id) };
  },

  // DELETE MANY
  deleteMany: async (resource: string, params: DeleteManyParams) => {
    const promises = params.ids.map((id) =>
      http(buildUrl(resource, id), { method: 'DELETE' }).then(async (r) => {
        if (!r.ok && r.status !== 204) throw { status: r.status, message: await r.text() };
        return id;
      })
    );
    const data = await Promise.all(promises);
    return { data };
  },
};

export default dataProvider;
