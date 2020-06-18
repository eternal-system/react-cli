
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')
const compiler = webpack(webpackConfig)

module.exports.server = (options, cb = null) => {
  const distPath = path.resolve(__dirname, 'dist')
  const filePath = path.resolve(__dirname, 'dist', 'index.html')

  app.use(express.static(distPath))

  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
  }))

  app.get('*', function (req, res, next) {
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(res)
    } else {
      webpack(webpackConfig, (err, stats) => {
        if (err) {
          console.error(err)
          return
        }
        if (stats.hasErrors()) {
          console.log('Build failed with errors.')
        }
        console.log(stats.compilation.errors)
      })
    }
  })

  app.listen(options.port || 8080, () => {
    cb && cb()
  })
}
