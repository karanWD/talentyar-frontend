import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/react-query/keys";
import { AddCommentFeedResponse, PostComment } from "@/features/feed/types";

import { addComment } from "../api/addComment";

export const useAddComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    AddCommentFeedResponse,
    Error,
    string,
    { previousComments: PostComment[] }
  >({
    mutationFn: (body: string) => addComment(postId, body),

    onMutate: async (body: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.list(postId),
      });

      const previousComments =
        queryClient.getQueryData<PostComment[]>(
          queryKeys.comments.list(postId),
        ) || [];

      const tempComment: PostComment = {
        id: Math.floor(Math.random() * -1000),
        post_id: postId,
        user_id: 0,
        user: {
          id: 0,
          first_name: "شما",
          last_name: "",
          full_name: "شما",
          username: "شما",
        },
        body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      queryClient.setQueryData<PostComment[]>(queryKeys.comments.list(postId), [
        ...previousComments,
        tempComment,
      ]);

      return { previousComments };
    },

    onError: (_err, _body, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          queryKeys.comments.list(postId),
          context.previousComments,
        );
      }
    },

    onSuccess: (response) => {
      const newComment = response.data?.comment;

      queryClient.setQueryData<PostComment[]>(
        queryKeys.comments.list(postId),
        (old = []) => [...old.filter((c) => c.id > 0), newComment],
      );
    },
  });
};
