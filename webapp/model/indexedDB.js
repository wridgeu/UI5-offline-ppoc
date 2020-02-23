sap.ui.define([
    "sap/ui/base/Object"
], function (Object) {
    "use strict";

    var instance;
    var globalScope = this;
    var indexedDB = Object.extend("mrb.offline.demo.model.indexedDB", {
        constructor: function(){},
        initDB: function (dbName, dbVers, arrObj) { // oSname, kPath){
            var oIDDB = this._openDB(dbName, dbVers); //indexedDB.open(dbname);
            oIDDB.onupgradeneeded = function (evt) {
                //evt.target.result.createObjectStore(oSname, {keyPath: kPath});
                //create multiple objectStores with multiple Keyfields at once;	
                for (var i = 0; i < arrObj.length; i++) {
                    evt.target.result.createObjectStore(arrObj[i][0], { keyPath: arrObj[i][1] });
                }
            }
            oIDDB.onsuccess = function (evt) {
                //could be implemented to create a "database state"
                console.log('Database got created or called: ');
                console.log(evt.target.result);
            }
            oIDDB.onerror = function (evt) {
                //Display error message in console
                console.log(evt.target.error.message);
            }
        },
        addOjectToDatabase: function (dbName, oStore, txoption, addObj) {
            var oIDDB = this._openDB(dbName); //window.indexedDB.open(dbname);
            oIDDB.onsuccess = function (evt) {
                var txn = evt.target.result.transaction(oStore, txoption);
                var store = txn.objectStore(oStore);
                store.add(addObj);
            }
            oIDDB.onerror = function (evt) {
                //Display error message in console
                console.log(evt.target.error.message);
            }
        },
        updateObjectInDatabase: function (dbName, oStore, txOption, oObjData) {
            txOption = txOption || "readwrite";
            var oIDDB = this._openDB(dbName); //window.indexedDB.open(dbname);
            oIDDB.onsuccess = function (evt) {
                var txn = evt.target.result.transaction(oStore, txOption);
                var store = txn.objectStore(oStore);
                store.put(oObjData);
            }
            oIDDB.onerror = function (evt) {
                //Display error message in console
                console.log(evt.target.error.message);
            }
        },
        readAllFromDatabase: function (dbName, oStore, txOption) {
            txOption = txOption || "readonly";
            var oIDDB = this._openDB(dbName); //window.indexedDB.open(dbname);
            oIDDB.onsuccess = function (evt) {
                var txn = evt.target.result.transaction(oStore, txOption);
                var txnObjStore = txn.objectStore(oStore);
                var oCursor = txnObjStore.openCursor();
                oCursor.onsuccess = function (evt) {
                    var currentCursor = evt.target.result;
                    if (currentCursor) {
                        //Placeholder logging - for each object in Object Store
                        console.log(currentCursor);
                        currentCursor.continue();
                    }
                }
            }
            oIDDB.onerror = function (evt) {
                //Display error message in console
                console.log(evt.target.error.message);
            }
        },
        deleteSpecificRow: function (dbName, oStore, txOption, delKey) {
            var oIDDB = this._openDB(dbName); //window.indexedDB.open(dbname);
            oIDDB.onsuccess = function (evt) {
                var txn = evt.target.result.transaction(oStore, txOption);
                var txnObjStore = txn.objectStore(oStore);
                var delRequest = txnObjStore.delete(delKey);
                delRequest.onsuccess = function () {
                    //Placeholder logging - for the deleted Row
                    console.log(delKey + " got deleted");
                }
            }
            oIDDB.onerror = function (evt) {
                //Display error message in console
                console.log(evt.target.error.message);
            }
        },
        deleteObjectStore: function (dbName, dbVers, oStore) {
            var oIDDB = this._openDB(dbName, dbVers);
            oIDDB.onupgradeneeded = function (evt) {
                evt.target.result.deleteObjectStore(oStore);
            }
            oIDDB.onerror = function (evt) {
                //Display error message in console
                console.log(evt.target.error.message);
            }
        },
        //opens up a database with a specific version:default 1
        _openDB: function (oDBName, dbVers) {
            dbVers = dbVers || "1";
            //make sure our browser supports indexeddb
            if (!('indexedDB' in window)) {
                return console.log('This browser doesn\'t support IndexedDB');;
            } else {
                // eslint-disable-next-line consistent-return
               
                return globalScope.indexedDB.open(oDBName, dbVers);
            }
        }
    });

    return {
        getInstance: function () {
            if (!instance) {
                instance = new indexedDB();
            }
            return instance;
        }
    };
});