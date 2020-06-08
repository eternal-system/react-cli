const http = require('http');
const fs = require('fs');
const path = require("path");

module.exports.server = (options, cb = null) => {

    const httpServer = http.createServer((req, res) => {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Expires': '0'
        });
        fs.createReadStream(path.join(__dirname + '/public/index.html')).pipe(res);
    })
    
    httpServer.listen(
        options.port, 
        options.host || 'localhost'
    , () => {
        
        cb && cb();
    });

   return {
        httpServer
   }  
 }