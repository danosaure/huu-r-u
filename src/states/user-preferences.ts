import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { UserPreferencesApiType } from '../api-types';
import { getUserPreferences, patchUserPreference } from '../api-gateway';
import { rootApiState } from './root-api';
import { UserPreferencesOptionType, UserPreferencesValueType } from '../models';

const defaultUserPreferencesSelector = selector<UserPreferencesApiType>({
  key: 'defaultUserPreferencesSelector',
  get: async ({ get }) => {
    const rootApi = get(rootApiState);
    return getUserPreferences(rootApi.userPreferences);
  },
});

const userPreferencesState = atom<UserPreferencesApiType>({
  key: 'userPreferences',
  default: defaultUserPreferencesSelector,
});

export const useUserPreferences = () => useRecoilValue(userPreferencesState);

const showWelcomeSelector = selector<boolean>({
  key: 'userPreferences__showWelcome',
  get: ({ get }) => {
    const userPreferences = get(userPreferencesState);
    if (userPreferences?.showWelcome !== undefined) {
      return userPreferences.showWelcome;
    }
  },
  set: ({ get, set }, showWelcome) => {
    const userPreferences = get(userPreferencesState);
    set(userPreferencesState, {
      ...userPreferences,
      showWelcome,
    });
  },
});

export const useShowWelcomeValue = () => useRecoilValue(showWelcomeSelector);
export const useSetShowWelcomeValue = () => useSetRecoilState(showWelcomeSelector);

export const useUserPreferencesPatch = () => {
  const rootApi = useRecoilValue(rootApiState);
  const setUserPreferences = useSetRecoilState(userPreferencesState);

  return async <T extends UserPreferencesOptionType, K extends UserPreferencesValueType<T>>(
    preference: T,
    value: K
  ): Promise<void> => {
    const res = await patchUserPreference(rootApi.userPreferences, preference, value);
    setUserPreferences(res);
  };
};
