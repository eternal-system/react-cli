require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
// const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack/config.js')
const PORT = process.env.SERVER_PORT || 8081
const chalk = require('chalk')
const app = express()
const filePath = path.resolve(__dirname, 'dist', 'index.html')
const compiler = webpack(webpackConfig)

// logger
const pino = require('pino')
const expressPino = require('express-pino-logger')
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const expressLogger = expressPino({ logger })

// ws
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const api = require('./server/connectors')

module.exports.server = (options, cb = null) => {
  // const distPath = path.resolve(__dirname, 'dist')

  app.set('socket', io)

  io.on('connection', (client) => {
    console.log(chalk.hex('#009688')('🚀 Socket: Connection Succeeded.'))

    client.on('message', message => api(message, client))

    client.on('disconnect', () => {
      console.log(chalk.hex('#009688')('❌ Socket: Disconnected.'))
    })
  })

  // Logger
  app.use(expressLogger)

  app.use(express.json({ extended: true }))
  app.use(require('./server/routes'))

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
        if (stats.hasErrors()) {
          console.log('Build failed with errors.')
        }
        console.log(stats.toString({
          chunks: false,  // Makes the build much quieter
          colors: true    // Shows colors in the console
        }));
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

  app.listen(options.port || PORT, () => {
    cb && cb()
  })
}
