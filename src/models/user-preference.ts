export type UserPreferenceType = {
  showWelcome?: boolean;
};

export class UserPreference {
  static readonly STORE_NAME = "user-preferences";
};
