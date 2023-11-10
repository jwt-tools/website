/* eslint-disable no-unused-vars */
import { Store } from "../db";

export type Token = {
  id?: number,
  name?: string,
  created: Date,
  token: string
  provider?: string,
}

export interface ITokensObjectStore {
  addToken(token: Token): Promise<Token>;
  putToken(token: Token): Promise<void>;
  getToken(id: number): Promise<Token | undefined>;
  getAllTokens(): Promise<Token[]>;
  deleteToken(id: number): Promise<void>;
}

const tokensStoreName = 'tokens';

export class TokensStore implements ITokensObjectStore {
  name = tokensStoreName;
  dbProvider: Store;

  constructor(dbProvider: Store) {
    this.dbProvider = dbProvider;
  }

  static async create(db: IDBDatabase) {
    return new Promise<void>((resolve, reject) => {
      if (!db.objectStoreNames.contains(tokensStoreName)) {
        const objectStore = db.createObjectStore(tokensStoreName, {
          keyPath: "id",
          autoIncrement: true,
        });

        // Create indexes
        objectStore.createIndex("id", "id", { unique: true }); //Does this need to be specified?
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("created", "created", { unique: false });
        objectStore.createIndex("token", "token", { unique: true });

        // Transaction completed
        objectStore.transaction.oncomplete = () => {
          resolve();
        };

        objectStore.transaction.onerror = (e) => {
          console.error('IDB error:', e);
          reject(new Error('ObjectStoreCreateError'));
        }
      }
    });
  }

  async addToken(token: Token): Promise<Token> {
    const db = await this.dbProvider.connect();

    const existing = await this._getTokenByEncodedToken(token.token);
    if (existing) {
      return token;
    }

    return new Promise<Token>((resolve, reject) => {
      const transaction = db.transaction(this.name, "readwrite");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.add(token);
  
      request.onsuccess = () => {
        resolve({
          id: request.result as number,
          ...token,
        });
      };
  
      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }

  async putToken(token: Token): Promise<void> {
    const db = await this.dbProvider.connect();

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.name, "readwrite");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.put(token);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }
  
  async getToken(id: number): Promise<Token | undefined> {
    return this._get('id', id);
  }

  private async _getTokenByEncodedToken(token: string): Promise<Token | undefined> {
    return this._get('token', token);
  }

  async _get(index: string, keyValue: number | string): Promise<Token | undefined> {
    const db = await this.dbProvider.connect();

    return new Promise<Token>((resolve, reject) => {
      const transaction = db.transaction(this.name, "readonly");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.index(index).get(keyValue);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }
  
  async getAllTokens(): Promise<Token[]> {
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
  
  async deleteToken(id: number): Promise<void> {
    const db = await this.dbProvider.connect();

    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(this.name, "readwrite");
      const objectStore = transaction.objectStore(this.name);
      const request = objectStore.delete(id);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (e: Event) => {
        reject(e.target);
      };
    });
  }
}
