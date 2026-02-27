import { http } from "@/core/api/http";

import { CreatePostResponse } from "../types";

type CreatePostBody = {
  caption: string;
  video_hash: string;
};

export const createPost = async (body: CreatePostBody) => {
  return http.post<CreatePostResponse, CreatePostBody>("/user/posts", body);
};
