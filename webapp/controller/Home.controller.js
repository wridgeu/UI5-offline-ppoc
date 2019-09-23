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
			indexedDB.initDB("localstorage", "1", [['keyvaluepairs', 'TANUM'], ['keyvaluepairs1', ['TANUM', 'TANUM2']]]);
		},
		onAddObject: function () {
			//Testdata
			var owht = {
				TANUM: '193254' + Math.random(),
				VLPLA: '24-23-1',
				NLPLA: '25-23-1'
			};
			//get current View ID and work with its controls - TODO
			var homeView = sap.ui.getCore().byId("container-offlineTest---home");
			if (homeView.byId("inputVLPLA").getValue() !== ""){
				owht.VLPLA = homeView.byId("inputVLPLA").getValue();
			}
			if (homeView.byId("inputNLPLA").getValue() !== ""){
				owht.NLPLA = homeView.byId("inputNLPLA").getValue();
			}
			//clear values again - TODO
			homeView.byId("inputNLPLA").setValue("");
			homeView.byId("inputNLPLA").getValue("");

			indexedDB.addOjectToDatabase("localstorage" , 'keyvaluepairs','readwrite', owht);
			console.log(owht.TANUM + " got added!");
		},
		onRead: function () {
			//Read from ObjectStore: DB, OStore, Readoption:READONLY
			var val = indexedDB.readAllFromDatabase("localstorage" , 'keyvaluepairs',"");
			console.log(val);
		},
		onDelete: function() {
			// DBname, OStoreName, txoption, key from keypath
			indexedDB.deleteSpecificRow("localstorage" , 'keyvaluepairs', 'readwrite', '1932540.04439057556329562');
		},
		onDeleteOStore: function() {
			//dbname, OStoreName, txoption, dbversion
			indexedDB.deleteObjectStore("localstorage" , "2", 'keyvaluepairs');
			//Wenn die DB gelöscht wird (und eine 2te Version existiert),
			//wird beim onInit kein neuer ObjectStore angelegt, da
			//standard Version "1" ist, und es keine Version "1" mehr gibt
		},
		onUpdateOStore: function(){
			//Testdata
			var owht = {
				TANUM: '',
				VLPLA: '',
				NLPLA: ''
			};
			//Update Testdata from view - TODO			
			var homeView = sap.ui.getCore().byId("container-offlineTest---home");
			owht.TANUM =  homeView.byId("inputKey").getValue();
			owht.VLPLA =  homeView.byId("inputnewVLPLA").getValue();
			owht.NLPLA =  homeView.byId("inputnewNLPLA").getValue();
			//clear values again - TODO
			homeView.byId("inputnewNLPLA").setValue("");
			homeView.byId("inputnewNLPLA").getValue("");
			homeView.byId("inputKey").getValue("");

			indexedDB.updateObjectInDatabase("localstorage", 'keyvaluepairs', 'readwrite', owht);
		},
		onSync: async function(){
			//http://10.199.2.253:8000/sap/bc/webrfc?_FUNCTION=Z_MRB_UI5SYNC&_name={%20key:%20test%20}
			//Dirty get core 
			var homeView = sap.ui.getCore().byId("container-offlineTest---home");			
			var tanumPar = homeView.byId("syncData").getValue();

			//SAOP?
			/* var xmlhttp = new XMLHttpRequest();
			xmlhttp.open('GET', 'http://Swuewm1.salt-solutions.de:8000/sap/bc/srt/wsdl/flv_10002P111AD1/sdef_url/Z_MRB_UI5SYNC_JSON?sap-client=020', true);
			//xmlhttp.setRequestHeader("SOAPAction", "urn:sap-com:document:sap:soap:functions:mc-style");
			//xmlhttp.setRequestHeader( "Content-Type","text/xml; charset=utf-8");
			xmlhttp.send();
			xmlhttp.onload = function(e){
				console.log(e);
			};
			xmlhttp.onprogress = function(e){
				console.log(e);
			}; */
			//WebRfC
			/*var  url = 'http://10.199.2.253:8000/sap/bc/webrfc?_FUNCTION=Z_MRB_UI5SYNC&_name=' + tanumPar;
			var response = await fetch(url, {
				mode: 'no-cors',
				credentials: 'include',
			}); */			
		}
	});
});