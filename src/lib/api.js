import axios from "axios";

// Normalize base URL to remove trailing slashes
const getBaseURL = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL || "http://103.98.76.142/api";
  return url.replace(/\/+$/, ""); // Remove trailing slashes
};

const API_BASE_URL = getBaseURL();

function getStored(key) {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setStored(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

// Shared axios client for the app (store/profile/dashboard hooks).
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getStored("accessToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Normalize URL to prevent double slashes (preserve http:// or https://)
  if (config.baseURL && config.url) {
    // Remove trailing slash from baseURL and leading slash from url, then combine
    const base = config.baseURL.replace(/\/+$/, "");
    const path = config.url.replace(/^\/+/, "");
    // Reconstruct to ensure no double slashes
    config.url = `/${path}`;
    config.baseURL = base;
  }
  return config;
});

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (!original) return Promise.reject(error);

    // Only handle 401s once per request.
    if (error.response?.status !== 401 || original.__isRetryRequest) {
      return Promise.reject(error);
    }

    const refresh = getStored("refreshToken");
    if (!refresh) return Promise.reject(error);

    original.__isRetryRequest = true;

    try {
      if (!refreshPromise) {
        // Use the api instance instead of raw axios to ensure proper URL handling
        refreshPromise = api.post('/auth/token/refresh/', { refresh });
      }

      const { data } = await refreshPromise;
      refreshPromise = null;

      if (data?.access) {
        setStored("accessToken", data.access);
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      }

      return Promise.reject(error);
    } catch (refreshErr) {
      refreshPromise = null;
      return Promise.reject(refreshErr);
    }
  }
);

export default api;
