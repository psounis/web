let db; // Global variable to store the opened database reference

// Function to open the database and return a promise that resolves when done
function openDatabase() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("MyDatabase", 7);

        request.onupgradeneeded = function(event) {
            db = event.target.result;

            if (db.objectStoreNames.contains("products")) {
                db.deleteObjectStore("products");
                console.log(`Object store products deleted.`);
            } else {
                console.warn(`Object store products does not exist.`);
            }

            // Create the "products" object store with "id" as the primary key
            if (!db.objectStoreNames.contains("products")) {
                let objectStore = db.createObjectStore("products", { keyPath: "id", autoIncrement: true});
                console.log("Object store 'products' created.");
                objectStore.createIndex('nameIndex', 'name', { unique: false });
                console.log("nameIndex Created");
            }
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            console.log("Database opened successfully.");
            resolve(db); // Resolve the promise once the database is successfully opened

            // Dispatch a custom event to notify the DB is ready
            document.dispatchEvent(new Event('dbReady'));
        };

        request.onerror = function(event) {
            console.error("Database error:", event.target.errorCode);
            reject(event.target.errorCode); // Reject the promise if an error occurs
        };
    });
}

// Open the database when the page loads
window.onload = async function() {
    try {
        db = await openDatabase(); // Store the db reference
    } catch (error) {
        console.error("Failed to open the database:", error);
    }
};