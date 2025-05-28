import axios from "axios";

// ✅ Base URL من متغيرات البيئة
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// ✅ إنشاء instance من axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15000, // زيادة timeout
  withCredentials: true,
});

// ✅ Interceptor لإضافة التوكن تلقائياً
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ Interceptor للتعامل مع الأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // خطأ عدم التصريح
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      window.location.href = "/login";
    }

    // خطأ عدم الصلاحية
    if (error.response?.status === 403) {
      console.error("🚫 Access denied:", error.response.data?.message);
    }

    // خطأ الخادم
    if (error.response?.status >= 500) {
      console.error("💥 Server error:", error.response.data);
    }

    // خطأ التحقق من صحة البيانات
    if (error.response?.status === 422) {
      console.error("⚠️ Validation error:", error.response.data?.errors);
    }

    return Promise.reject(error);
  }
);

// ✅ Auth API
export const authAPI = {
  login: async (credentials) => {
    try {
      // الحصول على CSRF token
      await axios.get(`${API_BASE_URL.replace("/api", "")}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      await axios.get(`${API_BASE_URL.replace("/api", "")}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });

      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/auth/logout");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ✅ Orphans API
export const orphansAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/orphans", { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/orphans/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (orphanData) => {
    try {
      const response = await api.post("/orphans", orphanData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, orphanData) => {
    try {
      const response = await api.put(`/orphans/${id}`, orphanData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/orphans/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  uploadFiles: async (id, files) => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      const response = await api.post(`/orphans/${id}/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFiles: async (id) => {
    try {
      const response = await api.get(`/orphans/${id}/files`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteFile: async (orphanId, fileId) => {
    try {
      const response = await api.delete(`/orphans/${orphanId}/files/${fileId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ✅ Statistics API
export const statisticsAPI = {
  getDashboard: async () => {
    try {
      const response = await api.get("/dashboard-stats");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDetailed: async (params = {}) => {
    try {
      const response = await api.get("/statistics/detailed", { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  exportReport: async (type, params = {}) => {
    try {
      const response = await api.get(`/statistics/export/${type}`, {
        params,
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ✅ Sponsors API
export const sponsorsAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/sponsors", { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/sponsors/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (sponsorData) => {
    try {
      const response = await api.post("/sponsors", sponsorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (id, sponsorData) => {
    try {
      const response = await api.put(`/sponsors/${id}`, sponsorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/sponsors/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ✅ Settings API
export const settingsAPI = {
  get: async () => {
    try {
      const response = await api.get("/settings");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (settings) => {
    try {
      const response = await api.put("/settings", settings);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateNotifications: async (notifications) => {
    try {
      const response = await api.put("/settings/notifications", notifications);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// ✅ Helper functions
export const apiHelpers = {
  // تحويل أخطاء التحقق إلى كائن مفهوم
  formatValidationErrors: (error) => {
    if (error.response?.status === 422) {
      return error.response.data.errors || {};
    }
    return {};
  },

  // التحقق من حالة الاتصال
  checkConnection: async () => {
    try {
      await api.get("/dashboard-stats");
      return true;
    } catch (error) {
      return false;
    }
  },

  // إعادة المحاولة
  retry: async (fn, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  },
};

export default api;