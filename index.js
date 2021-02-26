const uWS = require('uWebSockets.js');
const getJson = require('./src/utils/getJsonData');

uWS.App({
}).get('/hello_world', (res, req) => {
    res.write('Hello world');
    res.end();
}).listen(7171, (listenSocket) => {
    console.log('serv is running');
});