import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiResponse } from "@/core/api/types";
import { queryKeys } from "@/core/react-query/keys";

import { dislikePost } from "../api/dislikePost";
import { likePost } from "../api/likePost";
import { FeedPost, GetUserFeedResponse } from "../types";

type ToggleLikeVariables = {
  postId: number;
  isLiked: boolean;
};

type ToggleLikeContext = {
  previousFeed?: GetUserFeedResponse;
};

type ToggleLikeResponse = ApiResponse<{ post: FeedPost }>;

export const useToggleLike = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ToggleLikeResponse,
    Error,
    ToggleLikeVariables,
    ToggleLikeContext
  >({
    mutationFn: async ({ postId, isLiked }) => {
      return isLiked ? await dislikePost(postId) : await likePost(postId);
    },

    onMutate: async ({ postId, isLiked }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.feed.user(),
      });

      const previousFeed = queryClient.getQueryData<GetUserFeedResponse>(
        queryKeys.feed.user(),
      );

      queryClient.setQueryData<GetUserFeedResponse>(
        queryKeys.feed.user(),
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: {
              ...old.data,
              posts: old.data.posts.map((post) =>
                post.id === postId
                  ? {
                      ...post,
                      likes_count: isLiked
                        ? post.likes_count - 1
                        : post.likes_count + 1,
                      user_has_liked: !isLiked,
                    }
                  : post,
              ),
            },
          };
        },
      );

      return { previousFeed };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousFeed) {
        queryClient.setQueryData(queryKeys.feed.user(), context.previousFeed);
      }
    },

    onSuccess: (data, variables) => {
      queryClient.setQueryData<GetUserFeedResponse>(
        queryKeys.feed.user(),
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: {
              ...old.data,
              posts: old.data.posts.map((post) =>
                post.id === variables.postId
                  ? {
                      ...post,
                      ...data.data?.post,
                    }
                  : post,
              ),
            },
          };
        },
      );
    },
  });
};
