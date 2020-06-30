const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')
const webpack = require('webpack')
// const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')
// const compiler = webpack(webpackConfig)

module.exports.server = (options, cb = null) => {
  // const distPath = path.resolve(__dirname, 'dist')
  const filePath = path.resolve(__dirname, 'dist', 'index.html')

  app.use(require('./server/routes'))
  app.use(express.json({ extended: true }))

  app.use(webpackHotMiddleware(webpack(webpackConfig)))

  app.use('/', express.static(path.join(__dirname, 'dist')))

  // app.use(express.static(distPath))

  // app.use(webpackDevMiddleware(compiler, {
  //   publicPath: webpackConfig.output.publicPath
  // }))

  // app.use(webpackHotMiddleware(compiler))

  /* static server */
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
  // app.get('*', function (req, res, next) {
  //   console.log('start cheak', fs.existsSync(filePath))

  //   if (fs.existsSync(filePath)) {
  //     console.log('read file!', filePath)
  //     fs.createReadStream(filePath).pipe(res)
  //   } else {
  //     webpack(webpackConfig, (err, stats) => {
  //       if (err) {
  //         console.error(err)
  //         return
  //       }
  //       if (stats.hasErrors()) {
  //         console.log('Build failed with errors.')
  //       }
  //       console.log(stats.compilation.errors)
  //     })
  //   }
  // })

  app.listen(options.port || 8080, () => {
    cb && cb()
  })
}
