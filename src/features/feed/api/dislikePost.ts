import { http } from "@/core/api/http";
import { ApiResponse } from "@/core/api/types";

import { FeedPost } from "../types";

export const dislikePost = (postId: number) => {
  return http.post<ApiResponse<{ post: FeedPost }>>(
    `/user/posts/${postId}/dislike`,
  );
};
