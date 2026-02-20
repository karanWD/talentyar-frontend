import { FeedCard } from "@/components/shared/FeedCard/FeedCard";
import PremiumCard from "@/components/shared/PremiumCard";

import InfoCard from "./components/InfoCard";

const posts = [
  {
    id: 1,
    user: {
      username: "Negin._.Hn",
      firstName: "نگین",
      lastName: "حسینی",
      avatar: "/test-avatar.jpg",
    },
    media: "/video-post.mp4",
    postText: "یه بخش کوچیک از تمرین امروزم نظرت چیه؟....",
    likesCount: 99,
    commentsCount: 3,
    createdAt: "1404-11-29",
  },
  {
    id: 2,
    user: {
      username: "Negin._.Hn",
      firstName: "نگین",
      lastName: "حسینی",
      avatar: "/test-avatar.jpg",
    },
    media: "/video-post.mp4",
    postText: "یه بخش کوچیک از تمرین امروزم نظرت چیه؟....",
    likesCount: 99,
    commentsCount: 3,
    createdAt: "1404-11-29",
  },
  {
    id: 3,
    user: {
      username: "Negin._.Hn",
      firstName: "نگین",
      lastName: "حسینی",
      avatar: "/test-avatar.jpg",
    },
    media: "/video-post.mp4",
    postText: "یه بخش کوچیک از تمرین امروزم نظرت چیه؟....",
    likesCount: 99,
    commentsCount: 3,
    createdAt: "1404-11-29",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col gap-4 px-5 pt-8 pb-30">
      <InfoCard />
      {posts.map((p) => (
        <FeedCard
          key={p.id}
          commentsCount={p.commentsCount}
          createdAt={p.createdAt}
          likesCount={p.likesCount}
          media={p.media}
          postText={p.postText}
          user={p.user}
        />
      ))}
      <PremiumCard />
    </div>
  );
};

export default Home;
