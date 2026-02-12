import { http } from "@/core/api/http";
import { ApiResponse } from "@/core/api/types";

import type {
  City,
  ProfileType,
  Province,
  UsernameCheckPayload,
  UsernameCheckResponse,
} from "./types";

export const checkUsername = (
  payload: UsernameCheckPayload,
  signal?: AbortSignal,
) => {
  return http.post<ApiResponse<UsernameCheckResponse>, UsernameCheckPayload>(
    "/user/username/check",
    payload,
    { signal },
  );
};

export const getProvinces = (search?: string) => {
  return http.get<ApiResponse<{ provinces: Province[] }>>("/public/provinces", {
    params: { search },
  });
};

export const getCities = (province_id: number, search?: string) => {
  return http.get<ApiResponse<{ cities: City[] }>>("/public/cities", {
    params: { search, province_id },
  });
};

export const postProfile = (payload: Partial<ProfileType>) => {
  return http.post<ApiResponse<void>>("/user/profile", payload);
};
