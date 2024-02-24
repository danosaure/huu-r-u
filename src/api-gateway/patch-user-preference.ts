import { ControllerType, controllerByName } from "../api-server/registry";
import { UserPreferencesType } from "../models";

export const patchUserPreference = async <
  T extends keyof UserPreferencesType,
  K extends UserPreferencesType[T]
>(
  preference: T,
  value: K
): Promise<void> => {
  const update: ControllerType = controllerByName("userPreferences", "PATCH");
  update(preference, value);
};
