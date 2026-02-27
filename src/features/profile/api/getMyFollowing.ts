import { http } from "@/core/api/http";

import { GetFollowingResponse } from "../types";

export const getMyFollowing = () =>
  http.get<GetFollowingResponse>("/user/following");
