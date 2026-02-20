"use client";

import { Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarImage } from "../../ui/avatar";

import VideoPlayer from "./VideoPlayer";

export type FeedCardProps = {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  media: string;
  postText: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
};

export function FeedCard({
  user,
  media,
  postText,
  likesCount,
  commentsCount,
  createdAt,
  isLiked = false,
}: FeedCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [likeCounter, setLikeCounter] = useState(likesCount);

  const handleLike = () => {
    if (liked) {
      setLikeCounter((prev) => prev - 1);
    } else {
      setLikeCounter((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="w-full">
      <Link href={`/profile/${user.username}`} className="flex w-fit">
        <div className="flex w-fit cursor-pointer items-center gap-2 pb-3">
          <Avatar size="lg">
            <AvatarImage src={user.avatar as string} alt={user.username} />
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm leading-5 font-semibold">
              {user.username}
            </span>
            <span className="text-muted-foreground text-xs leading-4">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>
      </Link>

      <div className="pb-2">
        <VideoPlayer src={media} />
      </div>

      <div className="flex items-center gap-3 pb-1">
        <button
          onClick={handleLike}
          className="flex items-center gap-1 transition-all active:scale-95"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              liked ? "fill-red-500 text-red-500" : ""
            }`}
            strokeWidth={1.5}
          />
          {likeCounter > 0 && <span className="text-sm">{likeCounter}</span>}
        </button>

        <span className="flex cursor-pointer items-center gap-1">
          <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
          {commentsCount > 0 && (
            <span className="text-sm">{commentsCount}</span>
          )}
        </span>
      </div>

      <div className="py-2 text-sm">
        <Link
          href={`/profile/${user.username}`}
          className="font-semibold hover:underline"
        >
          {user.username}
        </Link>{" "}
        {postText}
      </div>

      <div className="text-muted-foreground pt-1 text-xs">{createdAt}</div>
    </div>
  );
}
