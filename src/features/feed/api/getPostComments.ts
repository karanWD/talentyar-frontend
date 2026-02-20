import { http } from "@/core/api/http";

import { GetCommentFeedResponse } from "../types";

export const getPostComments = (postId: number) =>
  http.get<GetCommentFeedResponse>(`/user/posts/${postId}/comments`);
