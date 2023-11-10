/* eslint-disable no-unused-vars */
import { Store } from "../db";

export type Endpoint = {
  url: string;
  last_fetched?: Date;
}

export interface IEndpointObjectStore {
  getAllEndpoints(): Promise<Endpoint[]>;
  addEndpoint(endpoint: Endpoint): Promise<void>;
  getEndpointByUrl(url: string): Promise<Endpoint | undefined>;
  putEndpoint(endpoint: Endpoint): Promise<void>;
}

const endpointsStoreName = 'endpoints';

export class EndpointsStore implements IEndpointObjectStore {
  name = endpointsStoreName;
  dbProvider: Store;

  constructor(dbProvider: Store) {
    this.dbProvider = dbProvider;
  }

  static async create(db: IDBDatabase) {
    return new Promise<void>((resolve, reject) => {
      if (!db.objectStoreNames.contains(endpointsStoreName)) {
        const objectStore = db.createObjectStore(endpointsStoreName, { keyPath: 'url' })

        objectStore.createIndex("url", "url", { unique: true });
    
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

  async getAllEndpoints(): Promise<Endpoint[]> {
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

  async addEndpoint(endpoint: Endpoint): Promise<void> {
    const db = await this.dbProvider.connect();

    return new Promise<void>((resolve, reject) => {  
      const transaction = db.transaction(this.name, "readwrite");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.add(endpoint);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }

  async putEndpoint(endpoint: Endpoint): Promise<void> {
    const db = await this.dbProvider.connect();

    return new Promise<void>((resolve, reject) => {  
      const transaction = db.transaction(this.name, "readwrite");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.put(endpoint);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }

  async getEndpointByUrl(url: string): Promise<Endpoint & { id: number } | undefined> {
    const db = await this.dbProvider.connect();

    return new Promise<Endpoint & { id: number } | undefined>((resolve, reject) => {  
      const transaction = db.transaction(this.name, "readwrite");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.get(url);
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }
}
