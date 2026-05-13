import { fetchJson } from "./client";

export async function fetchPortfolio() {
  return fetchJson("/content", {
    method: "GET",
  });
}

export async function fetchPublicPortfolio(username) {
  return fetchJson(`/portfolio/${encodeURIComponent(username)}`, {
    method: "GET",
  });
}


export async function fetchAdminItems(type, token) {
  return fetchJson(`/content/admin/${type}`, {
    method: "GET",
    token,
  });
}

export async function createAdminItem(type, data, token) {
  return fetchJson(`/content/admin/${type}`, {
    method: "POST",
    token,
    body: data,
  });
}

export async function updateAdminItem(type, id, data, token) {
  return fetchJson(`/content/admin/${type}/${id}`, {
    method: "PUT",
    token,
    body: data,
  });
}

export async function deleteAdminItem(type, id, token) {
  return fetchJson(`/content/admin/${type}/${id}`, {
    method: "DELETE",
    token,
  });
}

export async function reorderAdminItems(type, order, token) {
  return fetchJson(`/content/admin/${type}/order`, {
    method: "PATCH",
    token,
    body: { order },
  });
}

export async function fetchAdminSettings(token) {
  return fetchJson("/content/admin/settings", {
    method: "GET",
    token,
  });
}

export async function updateAdminSetting(key, value, token) {
  return fetchJson(`/content/admin/settings/${key}`, {
    method: "PUT",
    token,
    body: { value },
  });
}

export async function uploadAdminAsset(file, token) {
  const formData = new FormData();
  formData.append("file", file);
  return fetchJson(`/content/admin/upload`, {
    method: "POST",
    token,
    body: formData,
  });
}
