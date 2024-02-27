import UrlPattern from "url-pattern";

import { ROUTES } from "./cache";
import { RegistryError } from "./error";
import { ControllersType } from "./types";

export const register = (
  name: string,
  url: string,
  controllers: ControllersType
): void => {
  const foundByName = ROUTES.find((route) => route.name === name);
  if (foundByName) {
    throw new RegistryError(`Path name="${name}" already used.`);
  }

  const foundByUrl = ROUTES.find((route) => route.url === url);
  if (foundByUrl) {
    throw new RegistryError(`Path url="${url}" already used.`);
  }

  const foundByPattern = ROUTES.find((route) => route.pattern.match(url));
  if (foundByPattern) {
    throw new RegistryError(`Path url="${url}" match another url pattern.`);
  }

  ROUTES.push({
    name,
    url,
    pattern: new UrlPattern(url),
    controllers,
  });
};
