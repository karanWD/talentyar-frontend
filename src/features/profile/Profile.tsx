"use client";
import ProfileHeader from "./components/ProfileHeader";
import ProfilePostsGrid from "./components/ProfilePostsGrid";
import { useMyPosts } from "./hooks/useMyPosts";
import { useMyProfile } from "./hooks/useMyProfile";

export default function Profile() {
  const { data: user, isLoading: profileLoading } = useMyProfile();
  const { data: posts, isLoading: postsLoading } = useMyPosts();

  if (profileLoading || postsLoading) return <p>در حال بارگذاری...</p>;

  if (!user) return <p>پروفایل پیدا نشد</p>;

  return (
    <main className="flex flex-col">
      <ProfileHeader user={user} />
      <ProfilePostsGrid posts={posts ?? []} />
    </main>
  );
}
