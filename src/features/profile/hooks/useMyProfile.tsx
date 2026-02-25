import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/react-query/keys";

import { getMyProfile } from "../api/getMyProfile";
import { UserProfile } from "../types";

export const useMyProfile = () => {
  return useQuery<UserProfile>({
    queryKey: queryKeys.profile.me,
    queryFn: async () => {
      const res = await getMyProfile();
      return res.data.user;
    },
    staleTime: 1000 * 60 * 2,
  });
};
