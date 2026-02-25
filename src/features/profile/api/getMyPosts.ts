import { http } from "@/core/api/http";

import { GetUserFeedResponse } from "../types";

export const getMyPosts = () => http.get<GetUserFeedResponse>("/user/posts");
