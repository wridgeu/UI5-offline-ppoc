sap.ui.define([
    "sap/ui/base/Object",
    "sap/base/Log"
], function (Object, Log) {
    "use strict";

    var instance;
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
            var oDatabaseConnection = this._openDB(this.dbName, this.dbVers); //Connect to our DB;
            oDatabaseConnection.onupgradeneeded = function (oEvt) {
                //Initialize our ObjectStore with  multiple Key-Fields at once;	
                for (var i = 0; i < this.arrObj.length; i++) {
                    oEvt.target.result.createObjectStore(this.arrObj[i][0], { keyPath: this.arrObj[i][1] });
                }
            }.bind(this);
            oDatabaseConnection.onsuccess = function (oEvt) {
                //could be implemented to create a "database state"
                // console.log('Database got created or called: ');
                Log.info("Database got created or called:");
                console.log(oEvt.target.result);
                oEvt.target.result.close();
            }
            oDatabaseConnection.onerror = function (oEvt) {
                //Display error message in console
                Log.warning(oEvt.target.error.message);
                // console.log(oEvt.target.error.message);
            }
        },
        //Create Entry Object in Object STore
        addOjectToDatabase: function (oStore, addObj) {
            var oDatabaseConnection = this._openDB(this.dbName); //window.indexedDB.open(dbname);
            oDatabaseConnection.onsuccess = function (oEvt) {
                var txn = oEvt.target.result.transaction(oStore, this.oTransactions.READ_WRITE);
                var store = txn.objectStore(oStore);
                store.add(addObj);
                oDatabaseConnection.result.close();
            }.bind(this)
            oDatabaseConnection.onerror = function (oEvt) {
                //Display error message in console
                Log.warning(oEvt.target.error.message);
            }
        },
        //Update Entry in Object Store
        updateObjectInDatabase: function (oStore, oObjData) {
            var oDatabaseConnection = this._openDB(this.dbName); //window.indexedDB.open(dbname);
            oDatabaseConnection.onsuccess = function (oEvt) {
                var txn = oEvt.target.result.transaction(oStore, this.oTransactions.READ_WRITE);
                var store = txn.objectStore(oStore);
                store.put(oObjData);
                oDatabaseConnection.result.close();
            }.bind(this)
            oDatabaseConnection.onerror = function (oEvt) {
                //Display error message in console
                Log.warning(oEvt.target.error.message);
            }
        },
        //Read all Entries
        readAllFromDatabase: function (oStore) {
            var oDatabaseConnection = this._openDB(this.dbName); //window.indexedDB.open(dbname);
            oDatabaseConnection.onsuccess = function (oEvt) {
                var txn = oEvt.target.result.transaction(oStore, this.oTransactions.READ_ONLY);
                var txnObjStore = txn.objectStore(oStore);
                var oCursor = txnObjStore.openCursor();
                oCursor.onsuccess = function (oEvt) {
                    var currentCursor = oEvt.target.result;
                    if (currentCursor) {
                        //Placeholder logging - for each object in Object Store
                        console.log(currentCursor);
                        currentCursor.continue();
                    } else {
                        oDatabaseConnection.result.close();
                    }
                }
            }.bind(this)
            oDatabaseConnection.onerror = function (oEvt) {
                //Display error message in console
                Log.warning(oEvt.target.error.message);
            }
        },
        //Delete Row in Object Store
        deleteSpecificRow: function (oStore, delKey) {
            var oDatabaseConnection = this._openDB(this.dbName); //window.indexedDB.open(dbname);
            oDatabaseConnection.onsuccess = function (oEvt) {
                var txn = oEvt.target.result.transaction(oStore, this.oTransactions.READ_WRITE);
                var txnObjStore = txn.objectStore(oStore);
                var delRequest = txnObjStore.delete(delKey);
                delRequest.onsuccess = function (oEvt) {
                    //Placeholder logging - for the deleted Row
                    console.log(delKey + " got deleted");
                }
                oDatabaseConnection.result.close();
            }.bind(this)
            oDatabaseConnection.onerror = function (oEvt) {
                //Display error message in console
                Log.warning(oEvt.target.error.message);
            }
        },
        //Delete entire Object Store
        deleteObjectStore: function (oStore) {
            this.dbVers += 1;
            var oDatabaseConnection = this._openDB(this.dbName, this.dbVers);
            oDatabaseConnection.onupgradeneeded = function (oEvt) {
                oEvt.target.result.deleteObjectStore(oStore);
            }
            oDatabaseConnection.onsuccess = function (oEvt) {
                console.log(oEvt)
                oDatabaseConnection.result.close();
            }
            oDatabaseConnection.onerror = function (oEvt) {
                //Display error message in console
                Log.warning(oEvt.target.error.message);
            }
        },
        //Add new Object Store
        createObjectStore: function (arrObjStore) {
            this.dbVers += 1;
            var oDatabaseConnection = this._openDB(this.dbName, this.dbVers);
            oDatabaseConnection.onupgradeneeded = function (oEvt) {
                console.log('Performing upgrade');
                for (var i = 0; i < arrObjStore.length; i++) {
                    oEvt.target.result.createObjectStore(arrObjStore[i][0], { keyPath: arrObjStore[i][1] });
                }
            };
            oDatabaseConnection.onsuccess = function (oEvt) {
                oDatabaseConnection.close();
            }
            oDatabaseConnection.onerror = function (oEvt) {
                console.log(oEvt);
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
        }.bind(this)
    });

    return {
        getInstance: function (dbName, dbVers, arrObj) {
            if (!instance) {
                instance = new IndexedDB(dbName, dbVers, arrObj);
            }
            return instance;
        }
    };
});