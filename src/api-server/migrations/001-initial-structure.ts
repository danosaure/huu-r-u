import { MigrationType } from "../../persistence";

export const migration: MigrationType = async (db: IDBDatabase) => {
  db.createObjectStore("user-preferences", { keyPath: "id" });
};
