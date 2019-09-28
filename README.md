![OpenUI5 logo](http://openui5.org/images/OpenUI5_new_big_side.png)

# Intro
This little repo is based of the OpenUI5 basic template app using the UI5 Build and Development Tooling. It's basically a test for SW, IndexedDB and other "Offline"-capabilities.

### Detailed information on SW & other stuff used:
* [SAP Blog - UI5 Offline Application](https://blogs.sap.com/2016/01/14/ui5-offline-application-using-serviceworker-api/)
* [SAP Blog - OpenUI5 into PWA](https://blogs.sap.com/2017/11/30/ui5ers-buzz-19-lets-be-progressive-convert-an-openui5-application-into-a-progressive-web-app/)
* [Stackoverflow - Reduce UI5 XHR](https://stackoverflow.com/questions/48883323/service-worker-registered-and-activated-but-doesnt-work-in-offline-mode)
* [Mozilla SW Documentation](https://developer.mozilla.org/de/docs/Web/API/Service_Worker_API)
* [Google SW Documentation](https://developers.google.com/web/fundamentals/primers/service-workers/)
* [PWA Sample on Github](https://github.com/SAP/openui5-pwa-sample/blob/master/src/service-worker.js)
* [Background Sync SW](https://davidwalsh.name/background-sync)
* [UI5Con 2019](https://www.youtube.com/watch?v=z_bwa1wMyT4&feature=youtu.be)
* [Localforage](https://github.com/localForage/localForage)
* [Fetch-API](https://gist.github.com/justsml/529d0b1ddc5249095ff4b890aad5e801)
* [CORS Anywhere](https://www.npmjs.com/package/cors-anywhere)

### ToDo:
* OData
* Adjust Controller/UI Code - currently only for testing & learning purposes
* Synchronization between Front- and Backend (with SW and IDDB-Data to OData or others; Fetch)
* Sync-Event on SW has to be implemented :white_check_mark:
* Bind IndexedDB Object Store as model to some list control
* Fixing SW registration when deployed to an SAP System ServiceWorker registration failed:  Failed to register a ServiceWorker: An SSL certificate error occurred when fetching the script.

## More information
* [Live Demo](https://sap.github.io/openui5-basic-template-app)
* [Documentation](https://openui5.hana.ondemand.com/#/topic/7a4d93c0b0bb439b9d889ffc5b02eac9)
* [UI5 Tooling](https://github.com/SAP/ui5-tooling)
* [OpenUI5](https://github.com/SAP/openui5)

## Prerequisites
The **UI5 build and development tooling command line interface (UI5 CLI)** has to be installed.
For installation instructions please see [Installing the UI5 CLI](https://github.com/SAP/ui5-tooling#installing-the-ui5-cli).

## Setup
1. Clone the repository and navigate into it
    ```sh
    git clone https://github.com/SAP/openui5-basic-template-app.git 
    or        https://github.com/SAPMarco/UI5-Offline-PPoC.git

    cd openui5-basic-template-app                                  
    or cd UI5-Offline-PPoC
    ```
1. Install all dependencies
    ```sh
    npm install
    ```

1. Start a local server and run the application (http://localhost:8080/index.html)
    ```sh
    ui5 serve -o /index.html or npm start
    ```

## Testing - !Might not work(several reasons)!

<img src="https://www.freeiconspng.com/uploads/dangerous-icon-13.png" alt="warning" height="50px" width="50" />

* Run ESLint code validation
    ```sh
    npm run lint
    ```
* Start a local server and execute the tests automatically after every change
    ```sh
    npm run watch
    ```
* Run ESLint, start a local server and run the tests in CI mode
    ```sh
    npm test
    ```

<img src="https://www.freeiconspng.com/uploads/dangerous-icon-13.png" alt="warning" height="50px" width="50" />


For more build and development options please see: [UI5 Build and Development Tooling](https://github.com/SAP/ui5-tooling)

## WebRfC SAP System

* [SAP Blog](https://blogs.sap.com/2012/08/07/webrfc-simply-calling-an-rfc-from-javascript/)
* [WebRFC Programming Documentation](https://help.sap.com/saphelp_46c/helpdata/en/2b/d920434b8a11d1894c0000e8323c4f/content.htm?no_cache=true)

#### Function module declaration:

1. Overview of Function Module
    ```
    *"----------------------------------------------------------------------
    *"*"Lokale Schnittstelle:
    *"  TABLES
    *"      QUERY_STRING STRUCTURE  W3QUERY
    *"      HTML STRUCTURE  W3HTML
    *"      MIME STRUCTURE  W3MIME
    *"  CHANGING
    *"     VALUE(CONTENT_TYPE) LIKE  W3PARAM-CONT_TYPE DEFAULT
    *"       'APPLICATION/JSON'
    *"     VALUE(CONTENT_LENGTH) LIKE  W3PARAM-CONT_LEN
    *"     VALUE(RETURN_CODE) LIKE  W3PARAM-RET_CODE
    *"----------------------------------------------------------------------
    ```
1. Changing-Parameter
    ```
    Parametername   Type    Type                DEFAULT
    CONTENT_TYPE	LIKE	W3PARAM-CONT_TYPE   'APPLICATION/JSON'
    CONTENT_LENGTH	LIKE	W3PARAM-CONT_LEN	                     
    RETURN_CODE     LIKE	W3PARAM-RET_CODE	                     
    ```
1. Tables-Parameter
    ```
    Parametername   Type    Type                DEFAULT
    QUERY_STRING	LIKE	W3QUERY
    HTML	        LIKE	W3HTML
    MIME	        LIKE	W3MIME	                     
    ```
1. Example Code
    ```
    DATA: name TYPE string.

    SORT query_string DESCENDING.

    READ TABLE query_string WITH KEY name = '_name'.

    name = query_string-value.

    DATA: htmldoc LIKE LINE OF html.

    CONCATENATE '{"results": [ {"key": "name", "value": "' name '"}, {"key": "phone", "value": "911"}]}' INTO htmldoc-line.

    INSERT htmldoc INTO TABLE html.   
    ```
1. Expose Module via WebRfC with Transaction SMW0 (F7, Function Module)

1. Function Module can be called via:
    ```
    http(s)://<IP/Server>:<PORT>/sap/bc/webrfc?_FUNCTION=<Function_Module_Name>&<key=value>
    ```

