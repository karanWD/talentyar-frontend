"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

import UploadBox from "./components/UploadBox";
import { useCreatePost } from "./hooks/useCreatePost";
import { useUploadMedia } from "./hooks/useUploadMedia";

type FormValues = {
  caption: string;
};

export default function Upload() {
  const router = useRouter();
  const [hash, setHash] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const { mutateAsync, isPending } = useCreatePost();
  const { remove } = useUploadMedia();

  const handleBack = () => {
    router.back();
  };

  const onSubmit = async (data: FormValues) => {
    if (!hash) {
      toast.error("ابتدا ویدیو را آپلود کنید", {
        position: "top-center",
        richColors: true,
      });
      return;
    }

    await mutateAsync({
      caption: data.caption,
      video_hash: hash,
    });

    toast.success("پست با موفقیت ثبت شد", {
      position: "top-center",
      richColors: true,
    });

    reset();
    remove();
    setHash(null);
    handleBack();
  };

  return (
    <main className="flex min-h-dvh flex-col gap-4 pt-2 pb-7">
      <div
        className="border-border flex cursor-pointer items-center border-b px-5 py-2"
        onClick={handleBack}
      >
        <span className="flex size-10.5 items-center justify-center">
          <ArrowRight size={16} />
        </span>
        <span className="text-sm">بازگشت</span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-ma flex flex-1 flex-col gap-4 px-5"
      >
        <UploadBox onSuccess={setHash} />

        <Field className="flex-1">
          <FieldLabel htmlFor="caption">درباره ویدیو</FieldLabel>
          <Textarea
            id="caption"
            rows={5}
            placeholder="درباره ویدیو خود یک متن کوتاه بنویسید"
            {...register("caption")}
          />
        </Field>

        <Button
          type="submit"
          variant={!hash ? "secondary" : "default"}
          disabled={isPending || !hash}
        >
          {isPending ? "در حال بارگذاری..." : "بارگذاری"}
        </Button>
      </form>
    </main>
  );
}
