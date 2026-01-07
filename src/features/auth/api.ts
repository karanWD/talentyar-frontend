import { http } from "@/core/api/http";

import type { SendOtpPayload, LoginPayload, LoginResponse } from "./types";

export const sendOtp = (payload: SendOtpPayload) => {
  return http.post<void>("/v1/user/auth/otp", payload);
};

export const login = (payload: LoginPayload) => {
  return http.post<LoginResponse>("/v1/user/auth/login", payload);
};
