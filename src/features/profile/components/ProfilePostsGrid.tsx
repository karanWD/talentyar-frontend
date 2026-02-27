"use client";

import { useRouter } from "next/navigation";

import { FeedPost } from "../types";

type Props = {
  posts: FeedPost[];
};

export default function ProfilePostsGrid({ posts }: Props) {
  const router = useRouter();

  const handleShowPost = (index: number) =>
    router.push(`/profile/posts?index=${index}`);
  return (
    <div className="grid grid-cols-3 gap-0.5 py-1">
      {posts.map((post, index) => (
        <div
          key={post.id}
          onClick={() => handleShowPost(index)}
          className="relative flex h-60 w-full cursor-pointer items-center justify-center overflow-hidden"
        >
          <video
            src={post.video.url}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            preload="metadata"
          />
        </div>
      ))}
    </div>
  );
}
