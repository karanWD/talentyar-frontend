"use client";
import { useQuery } from "@tanstack/react-query";

import PremiumCard from "@/components/shared/PremiumCard";
import { queryKeys } from "@/core/react-query/keys";

import { FeedCard } from "../feed/components/FeedCard";
import { getUserFeed } from "../home/api/getUserFeed";

import SearchInput from "./components/SearchInput";

const Explore = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.feed.user(),
    queryFn: getUserFeed,
  });
  const posts = data?.data?.posts;

  if (isLoading) return <div>loading...</div>;

  return (
    <main className="flex flex-col gap-4 p-5">
      <SearchInput />
      {/* popular Feed cards  */}
      {posts?.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}

      <PremiumCard />
    </main>
  );
};

export default Explore;
