export type UserPreferencesType = {
  showWelcome?: boolean;
};

export type PersistentUserPreferencesType = UserPreferencesType & {
  id: "me";
};

export class UserPreference {
  static readonly STORE_NAME = "user-preferences";
}
