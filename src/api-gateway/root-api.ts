import { controllerByUrlMethod } from "../api-server/registry";
import { RootApiType } from "../api-types";

export const getRootApi = async (): Promise<RootApiType> => {
  const controller = controllerByUrlMethod("/", "GET");
  const res = controller<RootApiType>();
  return res;
}
