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

function getById(objectstore, id) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([objectstore], "readonly");
        let store = transaction.objectStore(objectstore);
        let request = store.get(id); // Get the record by ID

        request.onsuccess = function(event) {
            if (request.result) {
                resolve(request.result); // Return the found record
            } else {
                reject(`Record with ID ${id} not found.`);
            }
        };

        request.onerror = function(event) {
            reject("Error retrieving record:", event.target.errorCode);
        };
    });
}

function getAll(objectstore) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([objectstore], "readonly");
        let store = transaction.objectStore(objectstore);
        let request = store.getAll(); // Get all records

        request.onsuccess = function(event) {
            resolve(request.result); // Return all records
        };

        request.onerror = function(event) {
            reject("Error retrieving all records:", event.target.errorCode);
        };
    });
}

function updateById(objectstore, updatedObject) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([objectstore], "readwrite");
        let store = transaction.objectStore(objectstore);

        let request = store.put(updatedObject); // Update the record (or add if it doesn't exist)

        request.onsuccess = function(event) {
            resolve(`Record with ID ${updatedObject.id} updated successfully.`);
        };

        request.onerror = function(event) {
            reject("Error updating record:", event.target.errorCode);
        };
    });
}

function deleteById(objectstore, id) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([objectstore], "readwrite");
        let store = transaction.objectStore(objectstore);

        let request = store.delete(id); // Delete the record by ID

        request.onsuccess = function(event) {
            resolve(`Record with ID ${id} deleted successfully.`);
        };

        request.onerror = function(event) {
            reject("Error deleting record:", event.target.errorCode);
        };
    });
}

function deleteAll(objectstore) {
    return new Promise((resolve, reject) => {
        let transaction = db.transaction([objectstore], "readwrite");
        let store = transaction.objectStore(objectstore);

        let request = store.clear(); // Clear all records from the store

        request.onsuccess = function(event) {
            resolve(`All records in '${objectstore}' deleted successfully.`);
        };

        request.onerror = function(event) {
            reject(`Error deleting all records from '${objectstore}':`, event.target.errorCode);
        };
    });
}