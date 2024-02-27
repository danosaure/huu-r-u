import { atomFamily } from "recoil";

const PROGRESS_DEFAULTS: Record<string, boolean> = {
  userPreferences: true,
};

const defaultById = (id: string): boolean => {
  return PROGRESS_DEFAULTS[id] || false;
};

export const inProgressState = atomFamily<boolean, string>({
  key: "inProgress",
  default: (id) => defaultById(id),
});
