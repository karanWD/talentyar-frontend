"use client";
import { useQuery } from "@tanstack/react-query";

import PremiumCard from "@/components/shared/PremiumCard";
import { queryKeys } from "@/core/react-query/keys";

import { FeedCard } from "../feed/components/FeedCard";
import { getUserFeed } from "../home/api/getUserFeed";

import ExploreSkeleton from "./components/ExploreSkeleton";
import SearchInput from "./components/SearchInput";

const Explore = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.feed.user(),
    queryFn: getUserFeed,
  });
  const posts = data?.data?.posts;

  if (isLoading) return <ExploreSkeleton />;

  return (
    <main className="flex flex-col gap-4 px-5 pt-5 pb-30">
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
