// Generalized function to add an object to any object store
function add(objectstore, object) {
    if (!db) {
        console.error("Database is not opened yet.");
        return;
    }

    let transaction = db.transaction([objectstore], "readwrite"); // Start a transaction
    let store = transaction.objectStore(objectstore);  // Access the specified object store

    let request = store.add(object); // Add the object

    request.onsuccess = function(event) {
        console.log(`Object added successfully to ${objectstore} with id:`, event.target.result);
    };

    request.onerror = function(event) {
        console.error(`Error adding object to ${objectstore}:`, event.target.errorCode);
    };
}