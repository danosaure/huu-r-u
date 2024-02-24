import { atom } from "recoil";

export const userPreferencesLoadingState = atom<boolean>({
  key: "userPreferencesLoading",
  default: true,
});
