/**
 * Cheak folder dist
 *
 * 1. If /dist exists to stream file => res
 * 2. If /dist !exists to webpack build new /dist
 */

const express = require('express')
const path = require('path')
const port = process.env.PORT || 8080
const app = express()
const fs = require('fs')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const distPath = path.resolve(__dirname, '/dist')

app.use(express.static(distPath))

app.get('*', function (req, res) {
  const filePath = path.resolve(__dirname, 'dist', 'index.html')

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

app.listen(port)
console.log('server started on port ' + port)
