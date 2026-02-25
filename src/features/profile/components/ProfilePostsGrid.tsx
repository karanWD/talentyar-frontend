"use client";
import { FeedCard } from "@/features/feed/components/FeedCard";

import { FeedPost } from "../types";

type Props = {
  posts: FeedPost[];
};

export default function ProfilePostsGrid({ posts }: Props) {
  return (
    <div className="grid grid-cols-3 gap-1 p-1">
      {posts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </div>
  );
}
