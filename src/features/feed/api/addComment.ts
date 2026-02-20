import { http } from "@/core/api/http";

import { AddCommentFeedResponse } from "../types";

export const addComment = (postId: number, body: string) => {
  return http.post<AddCommentFeedResponse>(`/user/posts/${postId}/comments`, {
    body,
  });
};
