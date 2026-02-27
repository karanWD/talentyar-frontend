import { http } from "@/core/api/http";

import { GetFollowersResponse } from "../types";

export const getMyFollowers = () =>
  http.get<GetFollowersResponse>("/user/followers");
