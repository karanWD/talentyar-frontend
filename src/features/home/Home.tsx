import { FeedCard } from "@/components/shared/FeedCard";
import PremiumCard from "@/components/shared/PremiumCard";
import avatarImage from "@/components/shared/test-avatar.jpg";
import postImage from "@/components/shared/test-post.jpg";

import InfoCard from "./components/InfoCard";

const posts = [
  {
    id: 1,
    user: {
      avatar: avatarImage,
      username: "Negin._.Hn",
      firstName: "نگین",
      lastName: "حسینی",
    },
    media: postImage,
    postText: "یه بخش کوچیک از تمرین امروزم نظرت چیه؟....",
    likesCount: 99,
    commentsCount: 3,
    createdAt: "1404-11-29",
  },
  {
    id: 2,
    user: {
      avatar: avatarImage,
      username: "Negin._.Hn",
      firstName: "نگین",
      lastName: "حسینی",
    },
    media: postImage,
    postText: "یه بخش کوچیک از تمرین امروزم نظرت چیه؟....",
    likesCount: 99,
    commentsCount: 3,
    createdAt: "1404-11-29",
  },
  {
    id: 3,
    user: {
      avatar: avatarImage,
      username: "Negin._.Hn",
      firstName: "نگین",
      lastName: "حسینی",
    },
    media: postImage,
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
