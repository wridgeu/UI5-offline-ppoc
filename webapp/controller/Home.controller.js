sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter",
	"../model/indexedDB"
], function(Controller, formatter, indexedDB) {
	"use strict";

	return Controller.extend("mrb.offline.demo.controller.App", {

		formatter: formatter,
		indexedDB: indexedDB,

		onInit: function () {
			//Create database: name, objectstore(multiple via array), keypath(multiple keys via array)
			//indexedDB.initDB("UI5_WHT", "1", 'WHT', 'TANUM');
			indexedDB.initDB("UI5_WHT", "1", [['WHT', 'TANUM'], ['WHT1', ['TANUM', 'TANUM2']]]);
		},
		onAddObject: function () {
			//Testdata
			var owht = {
				TANUM: '193254' + Math.random(),
				VLPLA: '24-23-1',
				NLPLA: '25-23-1'
			};
			indexedDB.addOjectToDatabase("UI5_WHT" , 'WHT','readwrite', owht);
			console.log(owht.TANUM + " got added!");
		},
		onRead: function () {
			//Read from ObjectStore: DB, OStore, Readoption:READONLY
			indexedDB.readAllFromDatabase("UI5_WHT" , 'WHT',"");
		},
		onDelete: function() {
			// DBname, OStoreName, txoption, key from keypath
			indexedDB.deleteSpecificRow("UI5_WHT" , 'WHT', 'readwrite', '1932540.04439057556329562');
		},
		onDeleteOStore: function() {
			//dbname, OStoreName, txoption, dbversion
			indexedDB.deleteObjectStore("UI5_WHT" , "2", 'WHT');
			//Wenn die DB gelöscht wird (und eine 2te Version existiert),
			//wird beim onInit kein neuer ObjectStore angelegt, da
			//standard Version "1" ist, und es keine Version "1" mehr gibt
		},
		onUpdateOStore: function(){
			//Testdata
			var owht = {
				TANUM: '193254',
				VLPLA: '24-23-2',
				NLPLA: '25-23-4'
			};
			indexedDB.updateObjectInDatabase("UI5_WHT", 'WHT', 'readwrite', owht);
		}
	});
});