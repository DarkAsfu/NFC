import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

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
        refreshPromise = axios.post(
          `${API_BASE_URL}/auth/token/refresh/`,
          { refresh },
          { headers: { "Content-Type": "application/json" } }
        );
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
