const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()


app.use(express.static(__dirname + '/dist'))

app.get('*', function (req, res){
   
const filePath = path.resolve(__dirname, 'dist', 'index.html');
 // res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  fs.createReadStream(filePath).pipe(res);
})

app.listen(port)
console.log("server started on port " + port)