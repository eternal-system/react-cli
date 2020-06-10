
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const compiler = webpack(webpackConfig)

module.exports.server = (options, cb = null) => {
  const distPath = path.resolve(__dirname, 'dist')
  const filePath = path.resolve(__dirname, 'dist', 'index.html')

  app.use(express.static(distPath))

  app.get('*', function (req, res, next) {
    console.log('start cheak', fs.existsSync(filePath))

    if (fs.existsSync(filePath)) {
      console.log('read file!', filePath)
      fs.createReadStream(filePath).pipe(res)
    } else {
      compiler.outputFileSystem.readFile(filePath, (err, result) => {
        if (err) {
          return next(err)
        }
        console.log('compil', result)
        fs.createReadStream(filePath).pipe(result)
        // res.set('content-type', 'text/html')
        // res.send(result)
        // res.end()
      })
    }
  })

  app.listen(options.port || 8080, () => {
    cb && cb()
  })
}
