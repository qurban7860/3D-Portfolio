const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  const isProd = import.meta.env.PROD;
  const isBrowserLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  if (!isBrowserLocalhost && envUrl?.includes("localhost")) {
    return "/api";
  }

  return envUrl || (isProd ? "/api" : "http://localhost:4002/api");
};

const API_BASE_URL = getApiBaseUrl();

async function fetchJson(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...(options.headers || {}),
  };

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(url, {
    method: options.method || "GET",
    headers,
    body: options.body instanceof FormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
  });

  const raw = await response.text();
  const payload = raw ? JSON.parse(raw) : null;

  if (!response.ok) {
    const message = payload?.message || response.statusText || "Request failed.";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return payload;
}

export { API_BASE_URL, fetchJson };
