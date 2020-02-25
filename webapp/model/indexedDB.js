sap.ui.define([
    "sap/ui/base/Object",
    "sap/base/Log"
], function (Object, Log) {
    "use strict";

    var IndexedDB = Object.extend("mrb.offline.demo.model.indexedDB", {
        constructor: function (dbName, dbVers, arrObj) {
            this.dbName = dbName;
            this.dbVers = parseInt(dbVers, 10) || parseInt("1", 10);;
            this.arrObj = arrObj;
            this.oTransactions = {
                READ_ONLY: "readonly",
                READ_WRITE: "readwrite",
                VERSION_CHANGE: "versionchange"
            };
            this.oDatabaseConnection = {};
            var oDbOpenRequest = this._openDB(this.dbName, this.dbVers); //Connect to our DB;
            oDbOpenRequest.onupgradeneeded = function (oEvt) {
                //Initialize our ObjectStore with  multiple Key-Fields at once;	
                for (var i = 0; i < this.arrObj.length; i++) {
                    oEvt.target.result.createObjectStore(this.arrObj[i][0], { keyPath: this.arrObj[i][1] });
                }
                Log.info("Database got upgraded.");
                console.log(oEvt.target.result);
                this.oDatabaseConnection = oEvt.target.result;
            }.bind(this);
            oDbOpenRequest.onsuccess = function (oEvt) {
                //could be implemented to create a "database state"
                // console.log('Database got created or called: ');
                Log.info("Database connection was opened.");
                console.log(oEvt.target.result);
                this.oDatabaseConnection = oEvt.target.result;
                // oEvt.target.result.close();
            }.bind(this)
            oDbOpenRequest.onerror = function (oEvt) {
                //Display error message in console
                Log.warning(oEvt.target.error.message);
                // console.log(oEvt.target.error.message);
            }
        },
        //Create Entry Object in Object STore
        addOjectToDatabase: function (oStore, addObj) {
            var oTransaction = this.oDatabaseConnection.transaction(oStore, this.oTransactions.READ_WRITE);
            var objectStore = oTransaction.objectStore(oStore);
            var objectStoreRequest = objectStore.add(addObj);
            objectStoreRequest.onsuccess = function () {
                Log.info("Database entry was successfully added.")
            };
            objectStoreRequest.onerror = function () {
                Log.fatal("Could not add new entry to database.")
            }
            oTransaction.oncomplete = function () {
                Log.info("Successfully completed 'add' transaction.")
            }
            oTransaction.onerror = function () {
                Log.fatal("Failed to open up transaction for adding a new entry.")
            }
        },
        //Update Entry in Object Store
        updateObjectInDatabase: function (oStore, oObjData) {
            var oTransaction = this.oDatabaseConnection.transaction(oStore, this.oTransactions.READ_WRITE);
            var objectStore = oTransaction.objectStore(oStore);
            var objectStoreRequest = objectStore.put(oObjData);
            objectStoreRequest.onsuccess = function () {
                Log.info("Database entry was successfully updated.")
            };
            objectStoreRequest.onerror = function () {
                Log.fatal("Could not update entry in database.")
            }
            oTransaction.oncomplete = function () {
                Log.info("Successfully completed 'put' transaction.")
            }
            oTransaction.onerror = function () {
                Log.fatal("Failed to open up transaction for updating entry.")
            }
        },
        //Read all Entries
        readAllFromDatabase: function (oStore) {
            var oTransaction = this.oDatabaseConnection.transaction(oStore, this.oTransactions.READ_ONLY);
            var objectStore = oTransaction.objectStore(oStore);
            var objectStoreRequest = objectStore.openCursor();
            objectStoreRequest.onsuccess = function (oEvt) {
                var cursor = oEvt.target.result;
                if (cursor) {
                    //Placeholder logging - for each object in Object Store
                    console.log(cursor);
                    cursor.continue();
                } else {
                    Log.info("No more entries in object store.");
                }
            }
            objectStoreRequest.onerror = function () {
                Log.fatal("Could not read database.")
            }
            oTransaction.oncomplete = function () {
                Log.info("Successfully completed 'iteration' over database.")
            }
            oTransaction.onerror = function () {
                Log.fatal("Failed to iterate over database.")
            }
        },
        //Delete Row in Object Store
        deleteByKey: function (oStore, delKey) {
            var oTransaction = this.oDatabaseConnection.transaction(oStore, this.oTransactions.READ_WRITE);
            var objectStore = oTransaction.objectStore(oStore);
            var objectStoreRequest = objectStore.delete(delKey);
            objectStoreRequest.onsuccess = function (oEvt) {
                Log.info(delKey + " got deleted.");
            }
            objectStoreRequest.onerror = function () {
                Log.fatal("Could not delete entry in database.")
            }
            oTransaction.oncomplete = function () {
                Log.info("Successfully completed 'deleteByKey' in database.")
            }
            oTransaction.onerror = function () {
                Log.fatal("Failed to delete entry in database.")
            }
        },
        //ReadyByKey
        readByKey: function (oStore, readKey) {
            var oTransaction = this.oDatabaseConnection.transaction(oStore, this.oTransactions.READ_ONLY);
            var objectStore = oTransaction.objectStore(oStore);
            var objectStoreRequest = objectStore.get(readKey);
            objectStoreRequest.onsuccess = function (oEvt) {
                console.log(oEvt.target.result);
                Log.info(readKey + " was selected.");
            }
            objectStoreRequest.onerror = function () {
                Log.fatal("Could not read entry in database.")
            }
            oTransaction.oncomplete = function () {
                Log.info("Successfully completed 'readByKey' in database.")
            }
            oTransaction.onerror = function () {
                Log.fatal("Failed to read entry from database.")
            }
        },
        //Delete entire Object Store
        deleteObjectStore: function (oStore) {
            //close previous connection in order to upgrade DB
            this.oDatabaseConnection.close();
            this.dbVers += 1;
            this.oDatabaseConnection = this._openDB(this.dbName, this.dbVers);
            this.oDatabaseConnection.onupgradeneeded = function (oEvt) {                
                oEvt.target.result.deleteObjectStore(oStore);
            }
            this.oDatabaseConnection.onsuccess = function (oEvt) {
                this.oDatabaseConnection = oEvt.target.result;
            }.bind(this)
            this.oDatabaseConnection.onerror = function (oEvt) {
                //Display error message in console
                Log.warning(oEvt.target.error.message);
                //TODO: Add new connection opener
            }
        },
        //Add new Object Store
        createObjectStore: function (arrObjStore) {
            //close previous connection in order to upgrade DB
            this.oDatabaseConnection.close();
            this.dbVers += 1;
            this.oDatabaseConnection = this._openDB(this.dbName, this.dbVers);
            this.oDatabaseConnection.onupgradeneeded = function (oEvt) {
                console.log('Performing upgrade');
                for (var i = 0; i < arrObjStore.length; i++) {
                    oEvt.target.result.createObjectStore(arrObjStore[i][0], { keyPath: arrObjStore[i][1] });
                }
            }
            this.oDatabaseConnection.onsuccess = function(oEvt){
                this.oDatabaseConnection = oEvt.target.result;
            }.bind(this)
            this.oDatabaseConnection.onerror = function () {
                Log.fatal("Could not upgrade database.")
                //TODO: Add new connection opener
            }
        },
        //opens up a database connection with version:default = 1
        _openDB: function (dbName, dbVers) {
            var indexedDB = this.indexedDB || this.mozIndexedDB || this.webkitIndexedDB || this.msIndexedDB || null;
            if (indexedDB !== null) {
                return indexedDB.open(dbName, dbVers);
            }
            Log.fatal("This Browser does not support IndexedDB.");
            console.log('This browser doesn\'t support IndexedDB.');
        }.bind(this),

        exit: function () {
            this.oDatabaseConnection.close();
        }
    });

    return {
        getInstance: function (dbName, dbVers, arrObj) {

            return new IndexedDB(dbName, dbVers, arrObj);
        }
    };
});