import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/react-query/keys";

import { getPostComments } from "../api/getPostComments";

export const usePostComments = (postId: number, enabled: boolean) => {
  return useQuery({
    queryKey: queryKeys.comments.list(postId),
    queryFn: async () => {
      const res = await getPostComments(postId);
      return res.data.comments;
    },
    enabled,
  });
};
