import { PersistenceError } from "../error";

export type MigrationType = (
  db: IDBDatabase,
  transaction: IDBTransaction
) => Promise<void>;

export type OnChangeVersionType = () => void;

export class PersistenceMigrationError extends PersistenceError {
  constructor(message: string) {
    super(message);
    this.name = "PersistenceMigrationError";
  }
}

export const open = (
  dbName: string,
  dbVersion: number,
  migrations: Record<string, MigrationType>,
  onchangeversion?: OnChangeVersionType
): Promise<IDBDatabase> =>
  new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = () => reject(request.error);

    request.onupgradeneeded = async (
      e: IDBVersionChangeEvent
    ): Promise<void> => {
      const db = request.result;
      const transaction = request.transaction as IDBTransaction;

      for (let version = e.oldVersion + 1; version <= db.version; version++) {
        console.log(`Migration version ${version}...`);
        const migration = migrations[version];
        if (migration) {
          await migration(db, transaction);
        } else {
          throw new PersistenceMigrationError(
            `Unable to find migration for version=${version}.`
          );
        }
      }
    };

    request.onsuccess = () => {
      const db = request.result;

      if (onchangeversion) {
        db.onversionchange = () => {
          db.close();
          onchangeversion();
        };
      }

      resolve(db);
    };
  });
