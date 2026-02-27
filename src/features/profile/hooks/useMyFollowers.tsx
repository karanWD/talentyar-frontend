import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/react-query/keys";

import { getMyFollowers } from "../api/getMyFollowers";
import { User } from "../types";

export const useMyFollowers = () => {
  return useQuery<User[]>({
    queryKey: queryKeys.followers.me,
    queryFn: async () => {
      const res = await getMyFollowers();
      return res.data.followers;
    },
    staleTime: 1000 * 60 * 2,
  });
};
