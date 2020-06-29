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

app.use(require('./routes'))
/* static server */
if (process.env.DEV_SERVER.trim() === 'true') {
  console.log('SSR start')

  app.use(express.json({ extended: true }))

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
console.log(`\n Server started on port ${port} \n`)
