import { UserPreference } from "../models";
import type {
  PersistentUserPreferencesType,
  UserPreferencesType,
} from "../models";
import persistence from "./persistence";
import { register } from "./registry";

const patch = async <
  T extends keyof UserPreferencesType,
  K extends UserPreferencesType[T]
>(
  preference: T,
  value: K
): Promise<T> => {
  const idb = await persistence();

  const transaction = idb.transaction(UserPreference.STORE_NAME, "readwrite");
  transaction.oncomplete = () => {
    idb.close();
  };

  const objectStore = transaction.objectStore(UserPreference.STORE_NAME);

  const persistentUserPreferences =
    await new Promise<PersistentUserPreferencesType>((resolve) => {
      const request = objectStore.get("me");
      request.onsuccess = () => resolve(request.result);
    });

  const newUserPreferences = {
    ...(persistentUserPreferences || { id: "me" }),
    [preference]: value,
  };

  return new Promise<any>((resolve) => {
    const request = objectStore.put(newUserPreferences);
    request.onsuccess = () => resolve(request.result);
  });
};

const get = async <
  T extends keyof UserPreferencesType,
  K extends PersistentUserPreferencesType[T]
>(
  preference: T
): Promise<K> => {
  const idb = await persistence();

  const transaction = idb.transaction(UserPreference.STORE_NAME, "readonly");
  transaction.oncomplete = () => {
    idb.close();
  };

  const objectStore = transaction.objectStore(UserPreference.STORE_NAME);

  const persistentItem = await new Promise<PersistentUserPreferencesType>(
    (resolve) => {
      const request = objectStore.get("me");
      request.onsuccess = () => resolve(request.result);
    }
  );

  return (persistentItem || {})[preference] as K;
};

register("userPreferences", "/user-preferences", {
  GET: get,
  PATCH: patch,
});
