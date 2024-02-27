import { ControllerType, controllerByUrlMethod } from "../api-server/registry";
import {
  PersistentUserPreferencesType,
  UserPreferencesOptionType,
  UserPreferencesValueType,
} from "../models";

export const patchUserPreference = async <
  T extends UserPreferencesOptionType,
  K extends UserPreferencesValueType<T>
>(
  url: string,
  preference: T,
  value: K
): Promise<PersistentUserPreferencesType> => {
  const update: ControllerType<PersistentUserPreferencesType> =
    controllerByUrlMethod(url, "PATCH");
  const res = update(preference, value);
  return res;
};
