import { http } from "@/core/api/http";
import { ApiResponse } from "@/core/api/types";

import type { SendOtpPayload, LoginPayload, LoginResponse } from "./types";

export const sendOtp = (payload: SendOtpPayload) => {
  return http.post<ApiResponse<void>>("/user/auth/otp", payload);
};

export const login = (payload: LoginPayload) => {
  return http.post<ApiResponse<LoginResponse>>("/user/auth/login", payload);
};
