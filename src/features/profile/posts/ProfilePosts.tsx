"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { FeedCard } from "@/features/feed/components/FeedCard";

import { useMyPosts } from "../hooks/useMyPosts";

export default function ProfilePosts() {
  const searchParams = useSearchParams();
  const index = Number(searchParams.get("index") ?? 0);

  const { data: posts } = useMyPosts();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const child = containerRef.current.children[index] as HTMLElement;
    child?.scrollIntoView({ behavior: "instant" });
  }, [index]);

  if (!posts) return null;

  return (
    <div
      ref={containerRef}
      className="flex h-dvh snap-y snap-proximity flex-col gap-4 overflow-y-scroll px-5 pt-8 pb-30"
    >
      {posts.map((post) => (
        <div key={post.id} className="snap-start">
          <FeedCard post={post} />
        </div>
      ))}
    </div>
  );
}
