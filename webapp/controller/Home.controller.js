sap.ui.define([
	"./BaseController",
	"../model/formatter",	
	"sap/m/MessageToast"
], function (Controller, formatter, MessageToast) {
	"use strict";

	return Controller.extend("mrb.offline.demo.controller.App", {

		formatter: formatter,

		onInit: function () {
			
		},
		onAddObject: function () {
			//Testdata
			var owht = {
				TANUM: '193254' + Math.floor((Math.random() * 999)),
				VLPLA: '24-23-' + Math.floor((Math.random() * 10)),
				NLPLA: '25-23-' + Math.floor((Math.random() * 10)),
			};

			if (this.byId("inputVLPLA").getValue() !== "") {
				owht.VLPLA = this.byId("inputVLPLA").getValue();
			}
			if (this.byId("inputNLPLA").getValue() !== "") {
				owht.NLPLA = this.byId("inputNLPLA").getValue();
			}
			//clear values again - TODO
			this.byId("inputNLPLA").setValue("");
			this.byId("inputNLPLA").getValue("");

			this.indexedDB.addOjectToDatabase('keyvaluepairs', owht);
			console.log(owht.TANUM + " got added!");
		},
		onRead: function () {
			//Read from ObjectStore: DB, OStore, Readoption:READONLY
			var val = this.indexedDB.readAllFromDatabase('keyvaluepairs');
			console.log(val);
		},
		onDelete: function () {
			// DBname, OStoreName, txoption, key from keypath
			var rowKey = this.byId("deleteKey").getValue();
			this.indexedDB.deleteSpecificRow('keyvaluepairs', rowKey);
		},
		onDeleteOStore: function () {
			//dbname, OStoreName, txoption, dbversion
			this.indexedDB.deleteObjectStore('keyvaluepairs');
			//Wenn die DB gelöscht wird (und eine 2te Version existiert),
			//wird beim onInit kein neuer ObjectStore angelegt, da
			//standard Version "1" ist, und es keine Version "1" mehr gibt
		},
		onUpdateOStore: function () {
			//Testdata
			var owht = {
				TANUM: '',
				VLPLA: '',
				NLPLA: ''
			};
			owht.TANUM = this.byId("inputKey").getValue();
			owht.VLPLA = this.byId("inputnewVLPLA").getValue();
			owht.NLPLA = this.byId("inputnewNLPLA").getValue();
			//clear values again - TODO
			this.byId("inputnewVLPLA").getValue("");
			this.byId("inputnewNLPLA").setValue("");
			this.byId("inputKey").getValue("");

			this.indexedDB.updateObjectInDatabase('keyvaluepairs', owht);
		},
		onCreateNewTable: function (){	
			this.indexedDB.createObjectStore([['Test', 'TANUM'], ['Test123', ['TANUM', 'TANUM2']]]);
		}
		// onSync: function () {
		// 	//Dirty get core, some UI stuff for syncing ...
		// 	// var homeView = sap.ui.getCore().byId("container-offlineTest---home");
		// 	// var tanumPar = homeView.byId("syncData").getValue();
		// 	// //trigger the SW sync process
		// 	// navigator.serviceWorker.ready.then(function(reg) {
		// 	// 	return reg.sync.register('sync-something');
		// 	// })
			
		// 	//WebRfC SAP System - EWM1: var  url = 'http://10.199.2.253:8000/sap/bc/webrfc?_FUNCTION=Z_MRB_UI5SYNC&_name=' + tanumPar;
			
		// 	//Placeholder API for testing: https://jsonplaceholder.typicode.com/todos/1
			
		// 	// sap@home http://vhcalnplci.dummy.nodomain:8000/sap/bc/webrfc?_FUNCTION=Z_UI5_SYNC&_name=test; !Successfully tested on deployment of the SAP System!
			
		// 	// sap@home - uploaded (and build) ui5 app for testing Link:
		// 	// https://vhcalnplci.dummy.nodomain:44300/sap/bc/ui5_ui5/sap/z_ui5sync_app_1/index.html?sap-client=001&sap-ui-language=DE&sap-ui-xx-devmode=true
		// 	(function () {
		// 		fetch("http://vhcalnplci.dummy.nodomain:8000/sap/bc/webrfc?_FUNCTION=Z_UI5_SYNC&_name=test", {
		// 			credentials: 'include',
		// 			headers: {
		// 				"Content-Type": "text/html"
		// 			  },
		// 			}).then(function (e) {
		// 				return e.json();
		// 			}).then(function (e) {
		// 				console.log(e);
		// 			});
		// 	})()
		// }
	});
});