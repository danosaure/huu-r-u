import { UserPreferences } from "../../models";
import type {
  PersistentUserPreferencesType,
  UserPreferencesOptionType,
  UserPreferencesValueType,
} from "../../models";
import persistence from "../persistence";
import { ControllerType, register } from "../registry";

const patch: ControllerType<PersistentUserPreferencesType> = async <
  T extends UserPreferencesOptionType,
  K extends UserPreferencesValueType<T>
>(
  preference: T,
  value: K
): Promise<PersistentUserPreferencesType> => {
  const idb = await persistence();

  const transaction = idb.transaction(UserPreferences.STORE_NAME, "readwrite");
  transaction.oncomplete = () => {
    idb.close();
  };

  const objectStore = transaction.objectStore(UserPreferences.STORE_NAME);

  const persistentUserPreferences =
    await new Promise<PersistentUserPreferencesType>((resolve) => {
      const request = objectStore.get(UserPreferences.DEFAULT.id);
      request.onsuccess = () => resolve(request.result);
    });

  const newUserPreferences = {
    ...(persistentUserPreferences || UserPreferences.DEFAULT),
    [preference]: value,
  };

  await new Promise<void>((resolve) => {
    const request = objectStore.put(newUserPreferences);
    request.onsuccess = () => resolve();
  });

  return newUserPreferences;
};

export type GetUserPreferencesParamsType = {
  id: string;
};

const get: ControllerType<PersistentUserPreferencesType> = async <
  PersistentUserPreferencesType
>({
  id,
}: GetUserPreferencesParamsType): Promise<PersistentUserPreferencesType> => {
  const idb = await persistence();
  const transaction = idb.transaction(UserPreferences.STORE_NAME, "readonly");
  transaction.oncomplete = () => {
    idb.close();
  };

  const objectStore = transaction.objectStore(UserPreferences.STORE_NAME);

  const persistentItem = await new Promise<PersistentUserPreferencesType>(
    (resolve) => {
      const request = objectStore.get(id);
      request.onsuccess = () => resolve(request.result);
    }
  );
  return {
    ...UserPreferences.DEFAULT,
    ...persistentItem,
  };
};

register("userPreferences", "/user-preferences/:id", {
  GET: get,
  PATCH: patch,
});
