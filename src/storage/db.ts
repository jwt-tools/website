
let db: IDBDatabase;

export type Token = {
    id: number,
    name: string,
    created: Date,
    token: string
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
            objectStore.transaction.oncomplete = (e: Event) => {
                console.info(`event ${e}`);
                console.info('object store created: tokens');
            }
        }

        //TODO - Create an object store for keys
        // Create an object store for keys
    //    if(!db.objectStoreNames.contains('keys')){
    //         const objectStore = db.createObjectStore('keys', { keyPath: 'kid'});

    //         // Create indexes
    //         objectStore.createIndex("kid", "kid", { unique: true }); 
    //         // jwk props
 
    //         // Transaction completed
    //         objectStore.transaction.oncomplete = (e: Event) => {
    //             console.info(`event ${e}`);
    //             console.info('object store created: keys');
    //         }
    //    }
    
    };
    return db;
}

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
        console.error(`IndexedDB error: ${e}`);
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
        console.error(`IndexedDB error: ${e}`);
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
        console.error(`IndexedDB error: ${e}`);
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
        console.error(`IndexedDB error: ${e}`);
    };
}

function indexedDBSupport(){
    return 'indexedDB' in window;
}
