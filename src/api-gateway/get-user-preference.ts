import { ControllerType, controllerByName } from "../api-server/registry";
import { UserPreferencesType } from "../models";

export const getUserPreference = async <
  T extends keyof UserPreferencesType,
  K extends UserPreferencesType[T]
>(
  preference: T
): Promise<K> => {
  const get: ControllerType = controllerByName("userPreferences", "GET");
  return get(preference);
};
