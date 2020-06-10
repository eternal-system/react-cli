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
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')
const compiler = webpack(webpackConfig)

module.exports.server = (options, cb = null) => {
  const distPath = path.resolve(__dirname, 'dist')
  const filePath = path.resolve(__dirname, 'dist', 'index.html')

  app.use(express.static(distPath))

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler))

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

      // webpack(webpackConfig, (err, stats) => {
      //   if (err) {
      //     console.error(err)
      //     return
      //   }
      //   console.log('webpack!', err)
      //   // console.log('webpack!', stats)
      //   // console.log('distPath', distPath)

      //   console.log('building')
      //    fs.createReadStream(filePath).pipe(res)
      // })
      // console.log('start compilation')

      // compiler.run((err, stats) => {
      //   if (err) {
      //     console.error(err)
      //     return
      //   }

      //   console.log('building')
      //   // fs.createReadStream(filePath).pipe(res)
      // })

      // compiler.outputFileSystem.readFile(filePath, (err, result) => {
      //   if (err) {
      //     return next(err)
      //   }
      //   res.set('content-type', 'text/html')
      //   res.send(result)
      //   res.end()
      // })
    }
  })

  app.listen(options.port || 8080, () => {
    cb && cb()
  })
}
