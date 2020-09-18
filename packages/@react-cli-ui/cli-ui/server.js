require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack/config.js')
const chalk = require('chalk')
const compiler = webpack(webpackConfig)

// logger
const pino = require('pino')
const expressPino = require('express-pino-logger')

module.exports.server = (options, cb = null) => {
  const PORT = process.env.SERVER_PORT || 8081
  const filePath = path.resolve(__dirname, 'dist', 'index.html')
  // Express server
  const app = express()

  // ws
  const http = require('http').createServer(app)
  const io = require('socket.io')(http)
  const api = require('./server/connectors')

  // logger
  const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
  const expressLogger = expressPino({ logger })

  app.set('socket', io)

  io.on('connection', (client) => {
    console.log(chalk.hex('#009688')('🚀 Socket: Connection Succeeded.'))
    client.on('message', message => api(message, client))
    client.on('disconnect', () => {
      console.log(chalk.hex('#009688')('❌ Socket: Disconnected.'))
    })
  })

  // Logger
  if (process.env.LOG_LEVEL) {
    app.use(expressLogger)
  }

  app.use(express.json({ extended: true }))
  app.use(require('./server/routes'))

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
  }))

  app.use(webpackHotMiddleware(compiler))

  /* static client */
  app.use('/', express.static(path.join(__dirname, 'dist')))

  /* static server */
  app.get('*', function (req, res) {
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(res)
    } else {
      webpack(webpackConfig, (err) => {
        if (err) {
          console.error(err)
          return
        }
        fs.createReadStream(filePath).pipe(res)
      })
    }
  })

  http.listen(options.port || PORT, () => {
    cb && cb()
  })
}
