import { ControllerType, controllerByUrlMethod } from "../api-server/registry";
import { UserPreferencesApiType } from "../api-types";
import { PersistentUserPreferencesType } from "../models";

export const getUserPreferences = async (
  url: string
): Promise<UserPreferencesApiType> => {
  const get: ControllerType<PersistentUserPreferencesType> =
    controllerByUrlMethod(url, "GET");
  return get();
};
