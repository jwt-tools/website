import { EndpointsStore, IEndpointObjectStore } from "./stores/endpoints";
import { IKeysObjectStore, KeysStore } from "./stores/keys";
import { ITokensObjectStore, TokensStore } from "./stores/tokens";

export interface IObjectStoreCreator {
  create(): Promise<void>;
}

export class ObjectStore implements IObjectStoreCreator {
  db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.db = db;
  }

  create(): Promise<void> {
    throw new Error('NotImplementedError');
  }
}

const DB_VERSION = 4;
const DB_NAME = "website-db";


function indexedDBSupport() {
  return "indexedDB" in window;
}

interface IStore {
  endpoints: IEndpointObjectStore;
  keys: IKeysObjectStore;
  tokens: ITokensObjectStore;
}

export interface IDBDatabaseProvider {
  connect(): Promise<IDBDatabase>;
}

export class Store implements IStore, IDBDatabaseProvider {
  private connectionPromise: Promise<IDBDatabase> | null;
  public keys: KeysStore;
  public tokens: TokensStore;
  public endpoints: EndpointsStore;

  constructor() {
    this.connectionPromise = null;
    this.keys = new KeysStore(this);
    this.tokens = new TokensStore(this);
    this.endpoints = new EndpointsStore(this);
  }

  async createDatabase(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      let _db: IDBDatabase;
  
      if (!indexedDBSupport())
        throw new Error("Your browser doesn't support IndexedDB");
  
      const openReq = window.indexedDB.open(DB_NAME, DB_VERSION);
  
      // Event handling
      openReq.onerror = (event) => {
        console.error(`IndexedDB error: ${event}`);
        reject(event.target);
      };
  
      openReq.onsuccess = (event) => {
        console.info("Successful database connection");
        _db = (event.target as IDBOpenDBRequest).result;
        resolve(_db);
      };
  
      // This event is only executed with new versions of the database
      openReq.onupgradeneeded = async (event) => {
        console.info("Database created");
        _db = (event.target as IDBOpenDBRequest).result;
  
        await Promise.all([
          TokensStore.create(_db),
          KeysStore.create(_db),
          EndpointsStore.create(_db),
        ]);
      };
    });
  }

  async connect() {
    if (!this.connectionPromise) {
      this.connectionPromise = this.createDatabase(); // stub
    }

    return this.connectionPromise;
  }
}

const store = new Store();
export default store;
