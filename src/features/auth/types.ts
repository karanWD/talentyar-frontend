export type SendOtpPayload = {
  phone: string;
};

export type LoginPayload = {
  phone: string;
  otp: string;
};

export type User = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
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
  post_skill: string | null;
  skill_level: string | null;
  activity_history: string | null;
  team_name: string | null;
  favorite_iranian_team: string | null;
  favorite_foreign_team: string | null;
  shirt_number: number | null;
  bio: string | null;
  followers_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
};

export type LoginResponse = {
  token: string;
  user: User;
  first_user: boolean;
};

export type ProfileResponse = {
  success: true;
  message: string;
  data: {
    user: User;
  };
};

export type ProfileErrorResponse = {
  success: false;
  message: string;
  data: null;
};
