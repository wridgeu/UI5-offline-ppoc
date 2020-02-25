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
			//Do not get Instance via OwnerComponent in Base-Class
			//We would have to call onInit from inheriting objects like "BaseController.prototype.onInit.apply(this);"
		}

	});
});