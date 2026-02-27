import { http } from "@/core/api/http";

import { UploadMediaResponse } from "../types";

export const uploadMedia = async (
  file: File,
  onProgress: (percent: number) => void,
  signal?: AbortSignal,
) => {
  const formData = new FormData();
  formData.append("file", file);

  return http.post<UploadMediaResponse, FormData>("/user/media", formData, {
    signal,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (event) => {
      const percent = Math.round((event.loaded * 100) / (event.total ?? 1));
      onProgress(percent);
    },
  });
};
