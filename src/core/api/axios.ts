import axios from "axios";

import { getToken, removeToken } from "../auth/token";

import { ApiResponse } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data as ApiResponse<unknown> | undefined;

    if (status === 401) {
      removeToken();

      if (typeof window !== "undefined") {
        window.location.href = "/auth";
      }

      return Promise.reject(new Error("توکن شما منقضی شده است"));
    }

    if (data?.errors) {
      const firstFieldError = Object.values(data.errors)[0]?.[0];
      if (firstFieldError) {
        return Promise.reject(new Error(firstFieldError));
      }
    }

    if (data?.message) {
      return Promise.reject(new Error(data.message));
    }

    if (!error.response) {
      return Promise.reject(new Error("اتصال به سرور برقرار نشد"));
    }

    return Promise.reject(new Error("خطای غیرمنتظره‌ای رخ داد"));
  },
);

export default api;
