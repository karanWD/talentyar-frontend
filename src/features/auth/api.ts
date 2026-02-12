import { http } from "@/core/api/http";
import { ApiResponse } from "@/core/api/types";

import type {
  SendOtpPayload,
  LoginPayload,
  LoginResponse,
  ProfileResponse,
} from "./types";

export const sendOtp = (payload: SendOtpPayload) => {
  return http.post<ApiResponse<void>>("/user/auth/otp", payload);
};

export const login = (payload: LoginPayload) => {
  return http
    .post<
      ApiResponse<LoginResponse>,
      typeof payload
    >("/user/auth/login", payload)
    .then((res) => {
      return res.data!;
    });
};

export const getProfile = () => http.get<ProfileResponse>("/user/profile");

export const logout = () => {
  return http.post<ApiResponse<void>>("/user/auth/logout");
};
