/**
 * Cheak folder dist
 *
 * 1. If /dist exists to stream file => res
 * 2. If /dist !exists to webpack build new /dist
 */
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

module.exports.server = (options, cb = null) => {
  app.use(express.static(__dirname + '/dist'))

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

  app.listen(options.port || 8080, () => {
    cb && cb()
  })
}
