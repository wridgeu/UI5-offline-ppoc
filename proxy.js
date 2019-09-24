var cors_proxy = require('cors-anywhere');
var host = "0.0.0.0";
var port = 8080;

cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with' ],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function(){
    //console.log("Cors is running on" + host + ":" + port);
    console.log(`Cors is running on ${host} and ${port}`);
})