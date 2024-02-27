import { ControllerType, generateUrlByName, register } from "../registry";



const get: ControllerType = async <RootApiType>(): Promise<RootApiType> => {
  const userPreferences = generateUrlByName('userPreferences', { id: 'me'});

  return {
    userPreferences,
  } as RootApiType;
};

register("root", "/", {
  GET: get,
});
