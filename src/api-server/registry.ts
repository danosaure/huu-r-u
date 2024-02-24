import { ApiServerError } from "./error";

export type ControllerType = <T>(...args: any[]) => Promise<T>;
export type ControllerMethodType = "GET" | "PATCH" | "UPDATE";
export type ControllersType = Partial<Record<ControllerMethodType, ControllerType>>;

const CONTROLLERS: Record<string, ControllersType> = {};
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
  controllers: ControllersType
): void => {
  if (PATH_NAMES[name]) {
    throw new RegistryError(`Path name "${name}" already used.`);
  }
  if (CONTROLLERS[path]) {
    throw new RegistryError(`Path "${path}" already used.`);
  }
  CONTROLLERS[path] = controllers;
  PATH_NAMES[name] = path;
};

export const api = (path: string): ControllersType => {
  const controller = CONTROLLERS[path];

  if (controller) {
    return controller;
  }
  throw new RegistryError(`Controller path "${path}" not found.`);
};

export const controllersByName = (name: string): ControllersType => {
  const path = PATH_NAMES[name];
  if (path) {
    return api(path);
  }
  throw new RegistryError(`Controller named "${name}" not found.`);
};

export const controllerByName = (
  name: string,
  method: ControllerMethodType
): ControllerType => {
  const controllers: ControllersType = controllersByName(name);
  if (controllers) {
    const controller = controllers[method];
    if (controller !== undefined) {
      return controller;
    }
    throw new RegistryError(`Controller ${method}:${name} not found.`);
  }
  throw new RegistryError(`Controllers ${name} not found.`);
};
