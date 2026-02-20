import { http } from "@/core/api/http";

import { GetUserFeedResponse } from "../types";

// export const getUserFeed = () => http.get<GetUserFeedResponse>("/user/feed");
export const getUserFeed = () => http.get<GetUserFeedResponse>("/user/posts");
