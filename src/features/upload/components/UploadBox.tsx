"use client";

import { Check, RotateCcw, Upload, X } from "lucide-react";
import { MouseEvent, useEffect, useRef } from "react";

import { useUploadMedia } from "../hooks/useUploadMedia";

import CircleProgress from "./CircleProgress";

type Props = {
  onSuccess: (hash: string) => void;
};

export default function UploadBox({ onSuccess }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { upload, cancel, retry, remove, progress, preview, hash, status } =
    useUploadMedia();

  useEffect(() => {
    if (hash) {
      onSuccess(hash);
    }
  }, [hash, onSuccess]);

  const handleRemove = () => {
    remove();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCancel = () => {
    cancel();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCancelOrRemoveClick = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    e.stopPropagation();
    if (status === "pending") {
      handleCancel();
    } else {
      handleRemove();
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div
        className="bg-muted border-muted-foreground relative flex h-90 w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed"
        onClick={() => status === "idle" && inputRef.current?.click()}
      >
        {preview && (
          <video
            src={preview}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            preload="metadata"
          />
        )}

        {status === "idle" && !preview && (
          <div className="flex cursor-pointer flex-col items-center gap-2">
            <Upload className="text-primary size-7" strokeWidth={1.5} />
            <p className="text-primary leading-6">ویدیو خود را بارگذاری کنید</p>
            <p className="text-muted-foreground text-sm leading-5">
              انتخاب از گالری
            </p>
          </div>
        )}

        {status === "pending" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-black/50">
            <CircleProgress progress={progress} />
            <p className="text-background text-sm leading-5">
              درحال بارگذاری ویدیو
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-background absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2.5 bg-black/50">
            <span className="flex size-10.5 items-center justify-center rounded-full bg-zinc-800/80">
              <Check size={22} strokeWidth={1.5} />
            </span>
            <span className="text-background text-sm leading-5">
              بارگذاری با موفقیت انجام شد
            </span>
          </div>
        )}

        {status === "error" && (
          <div className="text-background absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-2.5 bg-black/50">
            <span className="flex size-10.5 items-center justify-center rounded-full bg-zinc-800/80">
              <RotateCcw
                strokeWidth={1.5}
                onClick={(e) => {
                  e.stopPropagation();
                  retry();
                }}
              />
            </span>
            <span className="text-background text-sm leading-5">تلاش مجدد</span>
          </div>
        )}

        {(status === "pending" ||
          status === "success" ||
          status === "error") && (
          <button
            onClick={(e) => handleCancelOrRemoveClick(e)}
            className="text-background absolute top-4 right-4 flex size-8 cursor-pointer items-center justify-center rounded-full bg-zinc-800/80"
          >
            <X strokeWidth={1.5} size={18} />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
        }}
      />
    </div>
  );
}
