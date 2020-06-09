const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()
const fs = require('fs');

console.log('start');
app.use(express.static(__dirname + '/dist'))

app.get('*', function (req, res){
   
const filePath = path.resolve(__dirname, 'dist', 'index.html');
    console.log(filePath);
     console.log('exist', fs.existsSync(filePath))
    // res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    if (fs.existsSync(filePath)) {
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
    }

})

app.listen(port)
console.log("server started on port " + port)