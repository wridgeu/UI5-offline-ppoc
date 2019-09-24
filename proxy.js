var cors_proxy = require('cors-anywhere');
var host = process.env.HOST || '0.0.0.0';
var port = process.env.PORT || 8080;


// should make requests usable if you add your http://localhost:<port>/<actual_URL> in front of stuff
cors_proxy.createServer({
    originWhitelist: [],
    requireHeader: ['origin', 'x-requested-with' ],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function(){
    console.log(`Cors is listening on ${host} and ${port}`);
})