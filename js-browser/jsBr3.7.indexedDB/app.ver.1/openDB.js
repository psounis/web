let db; // Global variable to store the opened database reference

// Function to open the database and return a promise that resolves when done
function openDatabase() {
    return new Promise((resolve, reject) => {
        let request = indexedDB.open("MyDatabase", 1);

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            console.log("upgrade needed!");
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