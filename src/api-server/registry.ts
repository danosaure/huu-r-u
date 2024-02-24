import { ApiServerError } from "./error";

export type ControllerType = (...args: any[]) => Promise<void>;

const CONTROLLERS: Record<string, ControllerType> = {};
const PATH_NAMES: Record<string, string> = {};

export class RegistryError extends ApiServerError {
  constructor(message: string) {
    super(message);
    this.name = "RegistryError";
  }
}

export const register = (
  name: string,
  path: string,
  controller: ControllerType
): void => {
  if (PATH_NAMES[name]) {
    throw new RegistryError(`Path name "${name}" already used.`);
  }
  if (CONTROLLERS[path]) {
    throw new RegistryError(`Path "${path}" already used.`);
  }
  CONTROLLERS[path] = controller;
  PATH_NAMES[name] = path;
};

export const api = (path: string): ControllerType => {
  const controller = CONTROLLERS[path];

  if (controller) {
    return controller;
  }
  throw new RegistryError(`Controller path "${path}" not found.`);
};

export const byName = (name: string): ControllerType => {
  const path = PATH_NAMES[name];
  if (path) {
    return api(path);
  }
  throw new RegistryError(`Controller named "${name}" not found.`);
};
