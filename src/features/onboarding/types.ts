type Gender = "male" | "female";
type HistoryType = "yes" | "no";

export type GenderType = Array<{
  label: string;
  value: Gender;
}>;

export type ActivityHistoryType = Array<{
  label: string;
  value: HistoryType;
}>;
