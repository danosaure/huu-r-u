import { controllersByUrl } from "./controllers-by-url";
import { RegistryError } from "./error";
import { ControllerMethodType, ControllerType } from "./types";

export const controllerByUrlMethod = <T>(
  url: string,
  method: ControllerMethodType
): ControllerType<T> => {
  const controllers = controllersByUrl(url);

  const methodController = controllers[method];

  if (methodController) {
    return methodController;
  }

  throw new RegistryError(`Cannot find method "${method}" for "${url}".`);
};
