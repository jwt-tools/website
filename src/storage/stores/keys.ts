/* eslint-disable no-unused-vars */
import { Store } from "../db";

export type Jwk = {
  kid: string;
  key: string; //stringified jwk
};

export interface IKeysObjectStore {
  addKey(jwk: Jwk): Promise<void>;
  getKeyById(kid: string): Promise<Jwk | undefined>;
  getAllKeys(): Promise<Jwk[]>;
}

const keysStoreName = 'keys';

export class KeysStore implements IKeysObjectStore {
  name = keysStoreName;
  dbProvider: Store;

  constructor(dbProvider: Store) {
    this.dbProvider = dbProvider;
  }

  static async create(db: IDBDatabase) {
    return new Promise<void>((resolve, reject) => {
      if (!db.objectStoreNames.contains(keysStoreName)) {
        const objectStore = db.createObjectStore(keysStoreName, { keyPath: "kid" });
  
        // Create indexes for jwk props
        objectStore.createIndex("kid", "kid", { unique: true });
        objectStore.createIndex("key", "key", { unique: false });
  
        // Transaction completed
        objectStore.transaction.oncomplete = () => {
          resolve();
        };

        objectStore.transaction.onerror = (e) => {
          console.error('IDB error:', e);
          reject(new Error('ObjectStoreCreateError'));
        }
      }
    })
  }

  async addKey(jwk: Jwk): Promise<void> {
    const db = await this.dbProvider.connect();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.name, "readwrite");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.add(jwk);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }
  
  async getKeyById(kid: string): Promise<Jwk | undefined> {
    const db = await this.dbProvider.connect();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.name, "readonly");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.get(kid);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }
  
  async getAllKeys(): Promise<Jwk[]> {
    const db = await this.dbProvider.connect();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(this.name, "readonly");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (e) => {
        reject(e.target);
      };
    });
  }
}
