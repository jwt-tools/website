
let db: IDBDatabase;

export type Token = {
    id: number,
    name: string,
    created: Date,
    token: string
}

export type Jwk = {
    kid: string,
    kty: string,
    alg: string,
    use: string,
    x5c: string[],
    n: string,
    e: string
}

//init the database
 async function createDatabase(): Promise<IDBDatabase> {

    if (!indexedDBSupport()) throw new Error("Your browser doesn't support IndexedBD");

    const request = window.indexedDB.open('website-db', 1);

    // Event handling
    request.onerror = (e: Event) => {
        console.error(`IndexedDB error: ${e}`);
    };

    request.onsuccess = () => {
        console.info('Successful database connection');
        db = request.result;
    };

    // This event is only executed the first time the database is created
    request.onupgradeneeded = (e: Event) => {
        console.info(`event ${e}`);
        console.info('Database created');
        const db = request.result;

        // Create an object store to store the tokens
        if(!db.objectStoreNames.contains('tokens')){
            const objectStore = db.createObjectStore('tokens', { keyPath: 'id', autoIncrement: true });

            // Create indexes
            objectStore.createIndex("id", "id", { unique: true }); //Does this need to be specified?
            objectStore.createIndex("name", "name", { unique: false });
            objectStore.createIndex("created", "created", { unique: false });
            objectStore.createIndex("token", "token", { unique: false });

            // Transaction completed
            objectStore.transaction.oncomplete = () => {
                console.info('object store created: tokens');
            }
        }

        // Create an object store for keys
       if(!db.objectStoreNames.contains('keys')){
            const objectStore = db.createObjectStore('keys', { keyPath: 'kid'});

            // Create indexes for jwk props
            objectStore.createIndex("kid", "kid", { unique: true }); 
            objectStore.createIndex("kty", "kty", { unique: false });
            objectStore.createIndex("alg", "alg", { unique: false });
            objectStore.createIndex("use", "use", { unique: false });
            objectStore.createIndex("x5c", "x5c", { unique: false }); 
            objectStore.createIndex("n", "n", { unique: false }); 
            objectStore.createIndex("e", "e", { unique: false });
 
            // Transaction completed
            objectStore.transaction.oncomplete = () => {
                console.info('object store created: keys');
            }
       }
    
    };
    return db;
}

// TOKENS
export async function addToken(token: Token) {
    if(!db){
        db = await createDatabase();
    }
    const transaction = db.transaction('tokens', 'readwrite');
    const objectStore = transaction.objectStore('tokens');
    const request = objectStore.add(token);

    request.onsuccess = () => {
        console.info('Token added to the database');
    };

    request.onerror = (e: Event) => {
        console.error(`IndexedDB error adding token: ${e}`);
    };
}

export async function getToken(id: number) {
    if(!db){
        db = await createDatabase();
    }
    const transaction = db.transaction('tokens', 'readonly');
    const objectStore = transaction.objectStore('tokens');
    const request = objectStore.get(id);

    request.onsuccess = () => {
        console.info('Token retrieved from the database');
        const token = request.result;
        return token;
    };

    request.onerror = (e: Event) => {
        console.error(`IndexedDB error retrieving token: ${e}`);
    };
}

export async function getAllTokens() {
    if(!db){
        db = await createDatabase();
    }
    const transaction = db.transaction('tokens', 'readonly');
    const objectStore = transaction.objectStore('tokens');
    const request = objectStore.getAll();

    request.onsuccess = () => {
        console.info('all tokens retrieved from the database');
        const tokens = request.result;
        return tokens;
    };

    request.onerror = (e) => {
        console.error(`IndexedDB error retrieving all tokens: ${e}`);
    };
}

export async function deleteToken(id: number) {
    if(!db){
        db = await createDatabase();
    }
    const transaction = db.transaction('tokens', 'readwrite');
    const objectStore = transaction.objectStore('tokens');
    const request = objectStore.delete(id);
    
    request.onsuccess = () => {
        console.info('Token deleted from the database');
    };

    request.onerror = (e: Event) => {
        console.error(`IndexedDB error deleting token: ${e}`);
    };
}

// KEYS

export async function addKey(jwk: Jwk) {
    if(!db){
        db = await createDatabase();
    }
    const transaction = db.transaction('keys', 'readwrite');
    const objectStore = transaction.objectStore('keys');
    const request = objectStore.add(jwk);

    request.onsuccess = () => {
        console.info('Key added to the database');
    };

    request.onerror = (e: Event) => {
        console.error(`IndexedDB error adding key: ${e}`);
    };
}

export async function getKey(kid: string) {

    if(!db){
        db = await createDatabase();
    }
    const transaction = db.transaction('keys', 'readonly');
    const objectStore = transaction.objectStore('keys');
    const request = objectStore.get(kid);

    request.onsuccess = () => {
        console.info('Key retrieved from the database');
        const key = request.result;
        return key;
    };

    request.onerror = (e: Event) => {
        console.error(`IndexedDB error retrieving key: ${e}`);
    };
}

export async function getAllKeys() {
    if(!db){
        db = await createDatabase();
    }
    const transaction = db.transaction('keys', 'readonly');
    const objectStore = transaction.objectStore('keys');
    const request = objectStore.getAll();

    request.onsuccess = () => {
        console.info('all keys retrieved from the database');
        const keys = request.result;
        return keys;
    };

    request.onerror = (e) => {
        console.error(`IndexedDB error retrieving all keys: ${e}`);
    };
    
}

function indexedDBSupport(){
    return 'indexedDB' in window;
}
