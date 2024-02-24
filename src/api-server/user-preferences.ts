import { UserPreference } from "../models";
import type { UserPreferenceType } from "../models";
import persistence from "./persistence";
import { register } from "./registry";

const update = async <
  T extends keyof UserPreferenceType,
  K extends UserPreferenceType[T]
>(
  preference: T,
  value: K
): Promise<void> => {
  const idb = await persistence();

  const transaction = idb.transaction(UserPreference.STORE_NAME, "readwrite");
  transaction.oncomplete = () => {
    idb.close();
  };

  const objectStore = transaction.objectStore(UserPreference.STORE_NAME);

  const newUserPreference = {
    preference,
    value,
  };

  await new Promise<void>((resolve) => {
    const request = objectStore.put(newUserPreference);
    request.onsuccess = () => resolve();
  });
};

register("userPreferences", "/user-preferences", update);
