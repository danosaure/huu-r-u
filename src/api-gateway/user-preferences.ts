import { ControllerType, controllerByUrlMethod } from "../api-server/registry";

import { UserPreferencesApiType } from "../api-types";

export const getUserPreferences = async (
  url: string
): Promise<UserPreferencesApiType> => {
  const get: ControllerType = controllerByUrlMethod(url, "GET");
  return get();
};
