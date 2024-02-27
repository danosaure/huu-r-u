import { ControllerType, controllerByUrlMethod } from "../api-server/registry";
import { UserPreferencesOptionType, UserPreferencesValueType } from "../models";

export const patchUserPreference = async <
  T extends UserPreferencesOptionType,
  K extends UserPreferencesValueType<T>
>(
  url: string,
  preference: T,
  value: K
): Promise<void> => {
  const update: ControllerType = controllerByUrlMethod(url, "PATCH");
  update(preference, value);
};
