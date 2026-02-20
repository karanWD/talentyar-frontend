//Feed Types
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

// Comments Type

export interface PostComment {
  id: number;
  post_id: number;
  user_id: number;
  user: User;
  body: string;
  created_at: string;
  updated_at: string;
}

export type GetCommentFeedResponse = {
  success: boolean;
  message: string;
  data: {
    comments: PostComment[];
  };
};

export type AddCommentFeedResponse = {
  success: boolean;
  message: string;
  data: {
    comment: PostComment;
  };
};
