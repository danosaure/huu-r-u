import { ROUTES } from "./cache";
import { RegistryError } from "./error";
import { ControllerParamsType } from "./types";

export const generateUrlByName = (
  name: string,
  params: ControllerParamsType
): string => {
  const foundByName = ROUTES.find((route) => route.name === name);
  if (!foundByName) {
    throw new RegistryError(`Path name="${name}" not found.`);
  }

  return foundByName.pattern.stringify(params);
};
