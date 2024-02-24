import { ApiServerError } from "./error";

export type ControllerType = (...args: any[]) => Promise<void>;

const CONTROLLERS: Record<string, ControllerType> = {};

export class RegistryError extends ApiServerError {
  constructor(message: string) {
    super(message);
    this.name = "RegistryError";
  }
}

export const register = (path: string, controller: ControllerType): void => {
  if (CONTROLLERS[path]) {
    throw new RegistryError(`Path "${path}" already used.`);
  }
  CONTROLLERS[path] = controller;
};

export const api = (path: string): ControllerType => {
  const controller = CONTROLLERS[path];

  if (controller) {
    return controller;
  }
  throw new RegistryError(`Controller path "${path}" not found.`);
};
