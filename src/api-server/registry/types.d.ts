import UrlPattern from "url-pattern";

export type ControllerType = <T>(...args: any[]) => Promise<T>;

export type ControllerMethodType = "GET" | "PATCH" | "UPDATE";

export type ControllersType = Partial<
  Record<ControllerMethodType, ControllerType>
>;

export type ControllerParamsType = Record<string, string>;

export type ControllersInfoType = {
  name: string;
  url: string;
  pattern: UrlPattern;
  controllers: ControllersType;
};
