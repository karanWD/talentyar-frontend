export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    profile: ["auth", "profile"] as const,
  },

  location: {
    all: ["location"] as const,
    provinces: ["location", "provinces"] as const,
    cities: (provinceId: number | string) =>
      ["location", "cities", provinceId] as const,
  },

  feed: {
    all: ["feed"] as const,
    user: () => [...queryKeys.feed.all, "user"] as const,
  },

  comments: {
    all: ["comments"] as const,
    list: (postId: number) => ["comments", postId] as const,
  },
};
