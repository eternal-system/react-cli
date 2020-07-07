require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')
const port = process.env.SERVER_PORT || 8080
const app = express()
const filePath = path.resolve(__dirname, 'dist', 'index.html')
const timeout = require('connect-timeout')
//const timeout = require('express-timeout-handler');

/* db */
if (!fs.existsSync('db.json')) {
  console.log('create new db')
  require('./server/util/db')
}



// app.use('/api/projects/create', (req, res, next) => {
//     req.setTimeout(4 * 60 * 1000); // No need to offset

//     req.socket.removeAllListeners('timeout'); // This is the work around
//     req.socket.once('timeout', () => {
//         req.timedout = true;
//         res.status(504).send('Timeout');
//     });

//     next();
// });

// const options = {
//   timeout: 180000
// }

// app.use(haltOnTimedout);
// app.use(timeout.handler(options));

// app.use(timeout('3m'))
app.use(express.json({ extended: true }))
// app.use(haltOnTimedout)

app.use(require('./server/routes'))



/* static server */
if (process.env.DEV_SERVER.trim() === 'true') {
  console.log('SSR start')
  app.use(timeout(125000));
  app.use(haltOnTimedout);

  app.use(webpackHotMiddleware(webpack(webpackConfig)))

  app.use('/', express.static(path.join(__dirname, 'dist')))

  app.get('*', function (req, res) {
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(res)
    } else {
      webpack(webpackConfig, (err, stats) => {
        if (err) {
          console.error(err)
          return
        }
        fs.createReadStream(filePath).pipe(res)
      })
    }
  })
}

app.listen(port)
  // .use(timeout('3m'))
  // .use((res, req, next) => {
  //   console.log('timers!')
  //   setTimeout(() => next(), 2000)
  // })
  // .use(haltOnTimedout)


function haltOnTimedout (req, res, next) {
  console.log('req.timedout !!!', req.timedout)
  if (!req.timedout) next()
}

console.log(`\n Server started on port ${port} \n`)
