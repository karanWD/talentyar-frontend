export type UploadMediaResponse = {
  success: boolean;
  message: string;
  data: {
    media: Media;
    hash: string;
  };
};

interface Media {
  id: number;
  name: string;
  path: string;
  url: string;
  hash: string;
  extension: string;
  mime_type: string;
  size: string;
  size_formatted: string;
  alt: null;
  type: string;
  collection: string;
  disk: string;
  meta_data: null;
  entity_slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostResponse {
  success: boolean;
  message: string;
  data: {
    post: Post;
  };
}

interface Post {
  id: number;
  user_id: number;
  state: number;
  caption: string;
  video: Video;
  likes_count: number;
  dislikes_count: number;
  created_at: string;
  updated_at: string;
}

interface Video {
  name: string;
  url: string;
  hash: string;
  type: string;
  entity_slug: string;
}
