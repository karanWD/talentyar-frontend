"use client";
import { useQuery } from "@tanstack/react-query";

import PremiumCard from "@/components/shared/PremiumCard";
import { queryKeys } from "@/core/react-query/keys";
import { FeedCard } from "@/features/feed/components/FeedCard";

import { getUserFeed } from "./api/getUserFeed";
import InfoCard from "./components/InfoCard";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.feed.user(),
    queryFn: getUserFeed,
  });
  const posts = data?.data?.posts;

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex flex-col gap-4 px-5 pt-8 pb-30">
      <InfoCard />
      {posts?.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}

      <PremiumCard />
    </div>
  );
};

export default Home;
