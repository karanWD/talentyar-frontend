export type UserProfile = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  avatar_url?: string | null;
  phone: string;
  email: string | null;
  username: string | null;
  province_id: number | null;
  city_id: number | null;
  gender: string | null;
  birth_date: string | null;
  weight: number | null;
  height: number | null;
  foot_specialization: string | null;
  post_skill:
    | "GK"
    | "CB"
    | "RB"
    | "LB"
    | "DM"
    | "CM"
    | "AM"
    | "LW"
    | "RW"
    | "CF"
    | "SS"
    | "ST"
    | null;
  skill_level: string | null;
  activity_history: number | null;
  team_name: string | null;
  favorite_iranian_team: string | null;
  favorite_foreign_team: string | null;
  shirt_number: number | null;
  bio: string | null;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
  posts_count?: number;
};

export type UserProfileResponse = {
  success: true;
  message: string;
  data: {
    user: UserProfile;
  };
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  username: string;
  avatar_url?: string;
};

export type FeedVideo = {
  name: string;
  url: string;
  hash: string;
  type: string;
  entity_slug: string;
};

export type FeedPost = {
  id: number;
  user_id: number;
  user: User;
  caption: string;
  video: FeedVideo;
  likes_count: number;
  comment_count: number;
  user_has_liked: boolean;
  created_at: string;
};

export type GetUserFeedResponse = {
  success: boolean;
  message: string;
  data: {
    posts: FeedPost[];
  };
};
