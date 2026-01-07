import type { AxiosRequestConfig } from "axios";

import api from "./axios";

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then((res) => res.data),

  post: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    api.post<T>(url, body, config).then((res) => res.data),

  put: <T, B = unknown>(url: string, body?: B, config?: AxiosRequestConfig) =>
    api.put<T>(url, body, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then((res) => res.data),
};
