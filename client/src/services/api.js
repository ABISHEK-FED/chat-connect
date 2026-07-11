import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Attach the JWT token to every request automatically
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("chatconnect_user");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// If token is invalid/expired, log the user out automatically
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("chatconnect_user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  profile: () => api.get("/auth/profile"),
};

export const userAPI = {
  getUsers: (search = "") => api.get(`/users${search ? `?search=${search}` : ""}`),
  getUserById: (id) => api.get(`/users/${id}`),
};

export const messageAPI = {
  send: (data) => api.post("/messages/send", data),
  getConversation: (userId) => api.get(`/messages/${userId}`),
};

export default api;
