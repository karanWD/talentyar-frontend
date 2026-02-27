"use client";
import ProfileHeader from "./components/ProfileHeader";
import ProfilePostsGrid from "./components/ProfilePostsGrid";
import ProfileSkeleton from "./components/ProfileSkeleton";
import { useMyPosts } from "./hooks/useMyPosts";
import { useMyProfile } from "./hooks/useMyProfile";

export default function Profile() {
  const { data: user, isLoading: profileLoading } = useMyProfile();
  const { data: posts, isLoading: postsLoading } = useMyPosts();

  if (profileLoading || postsLoading) return <ProfileSkeleton />;

  if (!user) return <p>پروفایل پیدا نشد</p>;

  return (
    <main className="flex flex-col">
      <ProfileHeader user={user} />
      <ProfilePostsGrid posts={posts ?? []} />
    </main>
  );
}
