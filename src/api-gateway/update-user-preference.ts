import { byName } from "../api-server/registry";
import { UserPreferenceType } from "../models";

export const updateUserPreference = async <
  T extends keyof UserPreferenceType,
  K extends UserPreferenceType[T]
>(
  preference: T,
  value: K
): Promise<void> => {
  const update = byName("userPreferences");
  update(preference, value);
};
