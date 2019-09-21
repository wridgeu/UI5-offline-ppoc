![OpenUI5 logo](http://openui5.org/images/OpenUI5_new_big_side.png)

# Intro
This little repo is based of the OpenUI5 basic template app using the UI5 Build and Development Tooling. It's basically a test for SW, IndexedDB and other "Offline"-capabilities.

### The Service-Worker example code is taken from the following sources:
* [SAP Blog - UI5 Offline Application](https://blogs.sap.com/2016/01/14/ui5-offline-application-using-serviceworker-api/)
* [Mozilla SW Documentation](https://developer.mozilla.org/de/docs/Web/API/Service_Worker_API)
* [Google SW Documentation](https://developers.google.com/web/fundamentals/primers/service-workers/)
* [PWA Sample on Github](https://github.com/SAP/openui5-pwa-sample/blob/master/src/service-worker.js)
* [UI5Con 2019](https://www.youtube.com/watch?v=z_bwa1wMyT4&feature=youtu.be)

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
    cd openui5-basic-template-app
    ```
1. Install all dependencies
    ```sh
    npm install
    ```

1. Start a local server and run the application (http://localhost:8080/index.html)
    ```sh
    ui5 serve -o /index.html
    ```

## Testing
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

For more build and development options please see: [UI5 Build and Development Tooling](https://github.com/SAP/ui5-tooling)

