import { http } from "@/core/api/http";

import { UserProfileResponse } from "../types";

export const getMyProfile = () =>
  http.get<UserProfileResponse>("/user/profile");
