import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/react-query/keys";

import { getMyFollowing } from "../api/getMyFollowing";
import { User } from "../types";

export const useMyFollowing = () => {
  return useQuery<User[]>({
    queryKey: queryKeys.following.me,
    queryFn: async () => {
      const res = await getMyFollowing();
      return res.data.following;
    },
    staleTime: 1000 * 60 * 2,
  });
};
