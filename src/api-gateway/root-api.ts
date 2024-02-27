import { ControllerType, controllerByUrlMethod } from '../api-server/registry';
import { RootApiType } from '../api-types';

export const getRootApi = async (): Promise<RootApiType> => {
  const controller: ControllerType<RootApiType> = controllerByUrlMethod('/', 'GET');
  const res = controller();
  return res;
};
