import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { uploadMedia } from "../api/uploadMedia";

export function useUploadMedia() {
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      abortRef.current = new AbortController();
      return uploadMedia(file, setProgress, abortRef.current.signal);
    },
    retry: false,
  });

  const upload = (selectedFile: File) => {
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    mutation.mutate(selectedFile);
  };

  const cancel = () => {
    abortRef.current?.abort();
    reset();
  };

  const retry = () => {
    if (file) {
      mutation.reset();
      setProgress(0);
      mutation.mutate(file);
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    mutation.reset();
    setProgress(0);

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setFile(null);
  };

  return {
    upload,
    cancel,
    retry,
    remove: reset,
    progress,
    preview,
    file,
    hash: mutation.data?.data.hash ?? null,
    status: mutation.status,
  };
}
