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
  comments_count: number;
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
