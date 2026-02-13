export type GenderType = Array<{
  label: string;
  value: number;
}>;

export type ActivityHistoryType = Array<{
  label: string;
  value: boolean;
}>;

export type UsernameCheckPayload = {
  username: string;
};

export type UsernameCheckResponse = {
  username: string;
  available: boolean;
};

export type Province = {
  id: number;
  name: string;
};

export type City = {
  id: number;
  name: string;
  province_id: number;
  province_name: string;
};

export type UserInfoType = {
  first_name: string;
  last_name: string;
  username: string;
};

export type PersonalInfoType = {
  province_id: string;
  city_id: string;
  gender: number;
  birth_date: string | Date;
  weight: number;
  height: number;
};

export type SkillInfoType = {
  foot_specialization: string;
  post_skill: string;
  skill_level: string;
  activity_history: boolean;
  team_name: string;
  favorite_iranian_team: string;
  favorite_foreign_team: string;
  shirt_number: number;
  bio: string;
};

export type ProfileType = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  username: string;
  province_id: string;
  city_id: string;
  gender: number;
  birth_date: string | Date;
  weight: number;
  height: number;
  foot_specialization: string;
  post_skill: string;
  skill_level: string;
  activity_history: boolean;
  team_name: string;
  favorite_iranian_team: string;
  favorite_foreign_team: string;
  shirt_number: number;
  bio: string;
};
