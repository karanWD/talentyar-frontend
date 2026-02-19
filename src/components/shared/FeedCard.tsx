"use client";

import { Heart, MessageSquare } from "lucide-react";
import Image, { StaticImageData } from "next/image";

import { Avatar, AvatarImage } from "../ui/avatar";

export type FeedCardProps = {
  user: {
    avatar: string | StaticImageData;
    username: string;
    firstName: string;
    lastName: string;
  };
  media: string | StaticImageData;
  postText: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
};

export function FeedCard({
  user,
  media,
  postText,
  likesCount,
  commentsCount,
  createdAt,
}: FeedCardProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center gap-2 border-none pb-3">
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

      {/* Media */}
      <div className="pb-2">
        <Image
          width={320}
          height={360}
          src={media}
          alt="پست"
          className="aspect-auto w-full rounded-2xl object-cover"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pb-1">
        <span className="flex items-center gap-1">
          <Heart className="h-5 w-5" strokeWidth={1.5} />
          {likesCount > 0 && <span className="text-sm">{likesCount}</span>}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
          {commentsCount > 0 && (
            <span className="text-sm">{commentsCount}</span>
          )}
        </span>
      </div>

      {/* Post text */}
      <div className="py-2 text-sm">
        <span className="font-semibold">{user.username}</span> {postText}
      </div>

      {/* Post date */}
      <div className="text-muted-foreground pt-1 text-xs">{createdAt}</div>
    </div>
  );
}
