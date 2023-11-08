let db: IDBDatabase;

export type Token = {
    id?: number,
    name?: string,
    created: Date,
    token: string
}

export type Jwk = {
  kid: string;
  key: string; //stringified jwk
};

const DB_VERSION = 2;
const DB_NAME = "website-db";

//init the database
export async function createDatabase() {
  if (!indexedDBSupport())
    throw new Error("Your browser doesn't support IndexedDB");

  const request = window.indexedDB.open(DB_NAME, DB_VERSION);

  // Event handling
  request.onerror = (e: Event) => {
    console.error(`IndexedDB error: ${e}`);
  };

  request.onsuccess = () => {
    console.info("Successful database connection");
    db = request.result;
  };

  // This event is only executed the first time the database is created
  request.onupgradeneeded = () => {
    console.info("Database created");
    const db = request.result;

    // Create an object store to store the tokens
    if (!db.objectStoreNames.contains("tokens")) {
      const objectStore = db.createObjectStore("tokens", {
        keyPath: "id",
        autoIncrement: true,
      });

      // Create indexes
      objectStore.createIndex("id", "id", { unique: true }); //Does this need to be specified?
      objectStore.createIndex("name", "name", { unique: false });
      objectStore.createIndex("created", "created", { unique: false });
      objectStore.createIndex("token", "token", { unique: false });

      // Transaction completed
      objectStore.transaction.oncomplete = () => {
        console.info("object store created: tokens");
      };
    }

    // Create an object store for keys
    if (!db.objectStoreNames.contains("keys")) {
      const objectStore = db.createObjectStore("keys", { keyPath: "kid" });

      // Create indexes for jwk props
      objectStore.createIndex("kid", "kid", { unique: true });
      objectStore.createIndex("key", "key", { unique: false });

      // Transaction completed
      objectStore.transaction.oncomplete = () => {
        console.info("object store created: keys");
      };
    }
  };
}

// TOKENS
export async function addToken(token: Token) {
  const dbPromise = window.indexedDB.open(DB_NAME, DB_VERSION);
  dbPromise.onsuccess = () => {
    db = dbPromise.result;

    const transaction = db.transaction("tokens", "readwrite");
    const objectStore = transaction.objectStore("tokens");
    const request = objectStore.add(token);

    request.onsuccess = () => {
      console.info("Token added to the database");
    };

    request.onerror = (e: Event) => {
      console.error(`IndexedDB error adding token: ${e}`);
    };
  };
}

export async function getToken(id: number): Promise<Token | undefined> {
  return new Promise((resolve, reject) => {
    const dbPromise = window.indexedDB.open(DB_NAME, DB_VERSION);
    dbPromise.onsuccess = () => {
      const transaction = db.transaction("tokens", "readonly");
      const objectStore = transaction.objectStore("tokens");
      const request = objectStore.get(id);

      request.onsuccess = () => {
        console.info("Token retrieved from the database");
        resolve(request.result);
      };

      request.onerror = (e: Event) => {
        console.error(`IndexedDB error retrieving token: ${e}`);
        reject(e);
      };
    };
  });
}

export async function getAllTokens(): Promise<Token[]> {
  return new Promise((resolve, reject) => {
    const dbPromise = window.indexedDB.open(DB_NAME, DB_VERSION);
    dbPromise.onsuccess = () => {
      const transaction = db.transaction("tokens", "readonly");
      const objectStore = transaction.objectStore("tokens");
      const request = objectStore.getAll();

      request.onsuccess = () => {
        console.info("all tokens retrieved from the database");
        resolve(request.result);
      };

      request.onerror = (e) => {
        console.error(`IndexedDB error retrieving all tokens: ${e}`);
        reject(e);
      };
    };
  });
}

export async function deleteToken(id: number) {
  const dbPromise = window.indexedDB.open(DB_NAME, DB_VERSION);
  dbPromise.onsuccess = () => {
    db = dbPromise.result;
    const transaction = db.transaction("tokens", "readwrite");
    const objectStore = transaction.objectStore("tokens");
    const request = objectStore.delete(id);

    request.onsuccess = () => {
      console.info("Token deleted from the database");
    };

    request.onerror = (e: Event) => {
      console.error(`IndexedDB error deleting token: ${e}`);
    };
  };
}

// KEYS

export async function addKey(jwk: Jwk) {
  const dbPromise = window.indexedDB.open(DB_NAME, DB_VERSION);
  dbPromise.onsuccess = () => {
    db = dbPromise.result;

    const transaction = db.transaction("keys", "readwrite");
    const objectStore = transaction.objectStore("keys");
    const request = objectStore.add(jwk);

    request.onsuccess = () => {
      console.info("Key added to the database");
    };

    request.onerror = (e: Event) => {
      console.error(`IndexedDB error adding key: ${e}`);
    };
  };
}

export async function getKey(kid: string): Promise<Jwk | undefined> {
  return new Promise((resolve, reject) => {
    const dbPromise = window.indexedDB.open(DB_NAME, DB_VERSION);
    dbPromise.onsuccess = () => {
      db = dbPromise.result;
      const transaction = db.transaction("keys", "readonly");
      const objectStore = transaction.objectStore("keys");
      const request = objectStore.get(kid);

      request.onsuccess = () => {
        console.info("Key retrieved from the database");
        resolve(request.result);
      };

      request.onerror = (e: Event) => {
        console.error(`IndexedDB error retrieving key: ${e}`);
        reject(e);
      };
    };
  });
}

export async function getAllKeys(): Promise<Jwk[]> {
  return new Promise((resolve, reject) => {
    const dbPromise = window.indexedDB.open(DB_NAME, DB_VERSION);
    dbPromise.onsuccess = () => {
      const transaction = db.transaction("keys", "readonly");
      const objectStore = transaction.objectStore("keys");
      const request = objectStore.getAll();

      request.onsuccess = () => {
        console.info("all keys retrieved from the database");
        resolve(request.result);
      };

      request.onerror = (e) => {
        console.error(`IndexedDB error retrieving all keys: ${e}`);
        reject(e);
      };
    };
  });
}

function indexedDBSupport() {
  return "indexedDB" in window;
}
