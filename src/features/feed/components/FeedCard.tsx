"use clinet";
import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { useToggleLike } from "../hooks/useToggleLike";
import { FeedPost } from "../types";

import { CommentsDrawer } from "./CommentsDrawer";
import VideoPlayer from "./VideoPlayer";

type Props = {
  post: FeedPost;
};

export function FeedCard({ post }: Props) {
  const [open, setOpen] = useState(false);
  const { mutate } = useToggleLike();

  const handleLike = () => {
    mutate({
      postId: post.id,
      isLiked: post.user_has_liked,
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <Link href={`/profile/${post.user.username}`} className="flex w-fit">
        <div className="flex items-center gap-2 pb-3">
          <Avatar size="lg">
            <AvatarImage src={post.user.avatar_url} alt={post.user.username} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{post.user.username}</span>
            <span className="text-muted-foreground text-xs">
              {post.user.first_name} {post.user.last_name}
            </span>
          </div>
        </div>
      </Link>

      {/* Media */}
      <div className="pb-2">
        <VideoPlayer src={post.video.url} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pb-1">
        <button
          onClick={handleLike}
          className="flex cursor-pointer items-center gap-1 transition active:scale-95"
        >
          <Heart
            className={`h-5 w-5 ${
              post.user_has_liked ? "fill-red-500 text-red-500" : ""
            }`}
            strokeWidth={1.5}
          />
          {post.likes_count > 0 && (
            <span className="text-sm">{post.likes_count}</span>
          )}
        </button>

        <span
          className="flex cursor-pointer items-center gap-1"
          onClick={() => setOpen(true)}
        >
          <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
          {post.comments_count > 0 && (
            <span className="text-sm">{post.comments_count}</span>
          )}
        </span>
      </div>

      {/* Caption */}
      <div className="py-2 text-sm">
        <Link href={`/profile/${post.user.username}`} className="font-semibold">
          {post.user.username}
        </Link>{" "}
        {post.caption}
      </div>

      <div className="text-muted-foreground text-xs">
        {new Date(post.created_at).toLocaleDateString("fa-IR")}
      </div>

      <CommentsDrawer postId={post.id} open={open} onOpenChange={setOpen} />
    </div>
  );
}
