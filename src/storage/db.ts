
let db: IDBDatabase;

export type Token = {
    id: number,
    name: string,
    created: Date,
    token: string
}

export type Jwk = {
    kid: string,
    key: string, //stringified jwk
}

//init the database
export async function createDatabase() {

    if (!indexedDBSupport()) throw new Error("Your browser doesn't support IndexedBD");

    const request = window.indexedDB.open('website-db', 2);

    // Event handling
    request.onerror = (e: Event) => {
        console.error(`IndexedDB error: ${e}`);
    };

    request.onsuccess = () => {
        console.info('Successful database connection');
        db = request.result;
    };

    // This event is only executed the first time the database is created
    request.onupgradeneeded = () => {
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
            objectStore.createIndex("key", "key", { unique: false });
 
            // Transaction completed
            objectStore.transaction.oncomplete = () => {
                console.info('object store created: keys');
            }
       }
    
    };
}

// TOKENS
export async function addToken(token: Token) {
   
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
   
    const dbPromise = window.indexedDB.open('website-db', 2);
    dbPromise.onsuccess = () => {
        db = dbPromise.result;

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

}

export async function getKey(kid: string): Promise <Jwk | undefined >{

    // if(!db){
    //     db = await createDatabase();
    // }
    const transaction = db.transaction('keys', 'readonly');
    const objectStore = transaction.objectStore('keys');
    const request = objectStore.get(kid);
    let key;
    request.onsuccess = () => {
        console.info('Key retrieved from the database');
         key = request.result;  
    };

    request.onerror = (e: Event) => {
        console.error(`IndexedDB error retrieving key: ${e}`);
    };
    return key;
}

export async function getAllKeys() {
    // if(!db){
    //     db = await createDatabase();
    // }
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
