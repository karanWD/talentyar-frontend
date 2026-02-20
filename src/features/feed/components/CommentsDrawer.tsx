import { ArrowUpIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";

import { useAddComment } from "../hooks/useAddComment";
import { usePostComments } from "../hooks/usePostComments";

type CommentsDrawerProps = {
  postId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormValues = {
  body: string;
};

export function CommentsDrawer({
  postId,
  open,
  onOpenChange,
}: CommentsDrawerProps) {
  const { data: comments, isLoading } = usePostComments(postId, open);

  const { mutate, isPending } = useAddComment(postId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (values: FormValues) => {
    mutate(values.body, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="mx-auto flex h-[85vh] max-w-125 flex-col">
        <DrawerHeader>
          <DrawerTitle>کامنت‌ها</DrawerTitle>
        </DrawerHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-4">
          {isLoading && (
            <p className="text-muted-foreground text-sm">در حال دریافت...</p>
          )}

          {!isLoading && comments?.length === 0 && (
            <p className="text-muted-foreground mt-8 text-center text-sm">
              فعلاً کامنتی گذاشته نشده
            </p>
          )}

          <div className="space-y-4 pb-24">
            {comments?.map((comment) => (
              <div
                key={comment.id}
                className="border-border flex gap-2 border-b py-2"
              >
                <Avatar>
                  <AvatarImage
                    src={comment.user.avatar_url || ""}
                    alt={comment.user.username}
                  />
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-medium">{comment.user.username}</span>
                  <span className="text-muted-foreground">{comment.body}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-background border-border flex shrink-0 gap-2 border-t p-4"
        >
          <Input
            {...register("body", { required: true })}
            placeholder="نظر خود را بنویسید..."
            aria-invalid={!!errors.body}
          />

          <Button type="submit" disabled={isLoading || isPending}>
            <ArrowUpIcon className="h-6 w-6" />
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
