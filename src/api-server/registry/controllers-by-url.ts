import { ROUTES } from "./cache";
import { RegistryError } from "./error";
import { ControllerParamsType, ControllersType } from "./types";

export const controllersByUrl = (url: string): ControllersType => {
  const foundRoute = ROUTES.find((route) => route.pattern.match(url));
  if (!foundRoute) {
    throw new RegistryError(`Controller for url="${url}" not found.`);
  }

  const controllerParams: ControllerParamsType = foundRoute.pattern.match(url);

  const controllers: ControllersType = Object.entries(foundRoute.controllers).reduce(
    (controllersWithClosure, [method, controller]) => ({
      ...controllersWithClosure,
      [method]: <T>(...args:any[]): Promise<T> => controller(...args, controllerParams),
    }),
    {}
  );

  return controllers;
};
