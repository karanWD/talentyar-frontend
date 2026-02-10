import axios from "axios";

import { ApiResponse } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error?.response?.data as ApiResponse<unknown> | undefined;

    if (data?.errors) {
      const firstFieldError = Object.values(data.errors)[0]?.[0];
      if (firstFieldError) {
        return Promise.reject(new Error(firstFieldError));
      }
    }

    if (data?.message) {
      return Promise.reject(new Error(data.message));
    }

    return Promise.reject(new Error("خطای غیرمنتظره‌ای رخ داد"));
  },
);

export default api;
