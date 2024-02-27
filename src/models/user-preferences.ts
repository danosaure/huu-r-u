export type UserPreferencesOptionsType = {
  showWelcome: boolean;
  theme: 'dark' | 'light';
};

export type UserPreferencesOptionType = keyof UserPreferencesOptionsType;
export type UserPreferencesValueType<T extends UserPreferencesOptionType> = UserPreferencesOptionsType[T];

export type PersistentUserPreferencesType = UserPreferencesOptionsType & {
  id: 'me';
};

export type PersistentUserPreferencesValueType<T extends UserPreferencesOptionType> = PersistentUserPreferencesType[T];

export class UserPreferences {
  static readonly STORE_NAME = 'user-preferences';
  static readonly DEFAULT: PersistentUserPreferencesType = {
    id: 'me',
    showWelcome: true,
    theme: 'dark',
  };
}
