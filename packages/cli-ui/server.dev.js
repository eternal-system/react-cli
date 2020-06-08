const http = require('http');
const fs = require('fs');
const path = require('path');

const httpServer = http.createServer((req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/html',
    //     'Expires': '0'
    // });
 
   // console.log(path.join(__dirname, 'dist', 'index.html'));
   

    let filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    let extname = String(path.extname(filePath)).toLowerCase();
    let mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';
    // console.log("contentType", contentType);
   
    res.writeHead(200, { 'Content-Type': contentType });   

    // path.join(__dirname, 'dist', 'index.html')
     fs.readFile(path.resolve(__dirname, 'dist', 'index.html'), 'utf-8', (err, text) => {
        if (err) {
            throw new Error('Error load file')
        }

        console.log(text)
    
        res.writeHead(200, { 'Content-Type': contentType });   
        res.end(text, 'utf-8');
    })
  //  fs.createReadStream(path.join(__dirname, '/dist/index.html'), 'utf-8').pipe(res);
})
    
httpServer.listen(
    '8080', 
    'localhost'
,() => {
    console.log('starter server on http://localhost:8080')
});

