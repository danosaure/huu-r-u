import { atom, selector, useRecoilValue } from "recoil";
import { UserPreferencesApiType } from "../api-types";
import { getUserPreferences } from "../api-gateway";
import { rootApiState } from "./root-api";

const defaultUserPreferencesSelector = selector<UserPreferencesApiType>({
  key: "defaultUserPreferencesSelector",
  get: async ({ get }) => {
    const rootApi = get(rootApiState);
    return getUserPreferences(rootApi.userPreferences);
  },
});

const userPreferencesState = atom<UserPreferencesApiType>({
  key: "userPreferences",
  default: defaultUserPreferencesSelector,
});

export const useUserPreferences = () => useRecoilValue(userPreferencesState);
