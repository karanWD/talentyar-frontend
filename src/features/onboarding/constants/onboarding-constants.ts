import { ActivityHistoryType, GenderType } from "../types";

export const genderOption: GenderType = [
  { label: "مرد", value: 0 },
  { label: "زن", value: 1 },
];

export const footOptions = [
  { label: "راست", value: "right" },
  { label: "چپ", value: "left" },
  { label: "دو پا", value: "both" },
];

export const positionOptions = [
  { label: "دروازه‌بان", value: "GK" },
  { label: "مدافع مرکزی", value: "CB" },
  { label: "مدافع راست", value: "RB" },
  { label: "مدافع چپ", value: "LB" },
  { label: "هافبک دفاعی", value: "DM" },
  { label: "هافبک مرکزی", value: "CM" },
  { label: "هافبک هجومی", value: "AM" },
  { label: "وینگر راست", value: "LW" },
  { label: "وینگر چپ", value: "RW" },
  { label: "مهاجم نوک", value: "CF" },
  { label: "مهاجم دوم", value: "SS" },
  { label: "مهاجم (گل زن)", value: "ST" },
];

export const skillLevelOptions = [
  { label: "مبتدی", value: "beginner" },
  { label: "نیمه حرفه‌ای", value: "semi-professional" },
  { label: "حرفه‌ای", value: "professional" },
];

export const activityHistoryOptions: ActivityHistoryType = [
  { label: "دارم", value: true },
  { label: "ندارم", value: false },
];
