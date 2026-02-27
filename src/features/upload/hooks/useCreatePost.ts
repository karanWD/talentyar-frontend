import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPost } from "../api/createPost";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-profile"],
      });
    },

    onError: (error) => {
      toast.error(error.message, { position: "top-center", richColors: true });
    },
  });
}
