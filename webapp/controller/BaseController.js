sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/indexedDB",
	"../model/formatter"
], function(Controller, indexedDB, formatter) {
	"use strict";

	return Controller.extend("mrb.offline.demo.controller.BaseController", {
		
		formatter: formatter,
		//Crate Instance: DatabaseName, DatabaseVersion, ArrayObject[[TableName, 'value'], [TableName [Value1, Value2]]]
		indexedDB: indexedDB.getInstance("localstorage", "1", [['keyvaluepairs', 'TANUM'], ['keyvaluepairs1', ['TANUM', 'TANUM2']]]),
		
		onInit: function () {
			//move iddb instance to component.js and get instance via ownercomponent here ..
		}

	});
});