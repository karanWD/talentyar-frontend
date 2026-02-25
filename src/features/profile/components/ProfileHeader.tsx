"use client";
import { PlusIcon } from "lucide-react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { positionMap } from "../constants/profile-constants";
import { UserProfile } from "../types";

type Props = {
  user: UserProfile;
};

export default function ProfileHeader({ user }: Props) {
  return (
    <div className="flex flex-col gap-4 px-5 py-4">
      <span className="text-center text-base leading-6 font-bold">
        {user.username}
      </span>

      <div className="flex items-center gap-4">
        <Avatar className="size-18" dir="rtl">
          <AvatarImage
            src={user.avatar_url ?? "test-avatar.jpg"}
            alt={user.username!}
          />
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge>
            <PlusIcon />
          </AvatarBadge>
        </Avatar>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-around gap-2">
            <div className="flex cursor-pointer flex-col items-center gap-1">
              <span className="text-sm leading-5">{user.posts_count ?? 0}</span>
              <span className="text-sm leading-5">ویدیو ها</span>
            </div>
            <div className="flex cursor-pointer flex-col items-center gap-1">
              <span className="text-sm leading-5">{user.followers_count}</span>
              <span className="text-sm leading-5">دنبال‌کننده </span>
            </div>
            <div className="flex cursor-pointer flex-col items-center gap-1">
              <span className="text-sm leading-5">{user.following_count}</span>
              <span className="text-sm leading-5">دنبال‌شونده </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm leading-5 font-medium">{user.full_name}</span>
        <div className="flex flex-col gap-1">
          {user.bio && <p className="text-xs leading-4">{user.bio}</p>}
          {user.team_name && (
            <p className="text-muted-foreground text-xs leading-4 font-light">
              بازیکن تیم {user.team_name}
            </p>
          )}
          {user.post_skill && (
            <p className="text-muted-foreground text-xs leading-4 font-light">
              {positionMap[user.post_skill]}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
