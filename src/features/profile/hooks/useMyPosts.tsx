import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/react-query/keys";

import { getMyPosts } from "../api/getMyPosts";
import { FeedPost } from "../types";

export const useMyPosts = () => {
  return useQuery<FeedPost[]>({
    queryKey: queryKeys.posts.me,
    queryFn: async () => {
      const res = await getMyPosts();
      return res.data.posts;
    },
    staleTime: 1000 * 60 * 2,
  });
};
