const express = require('express');
const path = require('path');
const app = express();

module.exports.server = (options, cb = null) => {
  
    app.use(express.static(__dirname + '/dist'))

    app.get('*', function (req, res){ 
        const filePath = path.resolve(__dirname, 'dist', 'index.html');
        fs.createReadStream(filePath).pipe(res);
    });

    app.listen(options.port || 8080 , () => {
            cb && cb();
    })
   
};