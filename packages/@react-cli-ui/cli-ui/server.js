require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

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

  /* static client */
  app.use('/', express.static(path.join(__dirname, 'dist')))

  /* static server */
  app.get('*', function (req, res) {
    if (fs.existsSync(filePath)) {
      fs.createReadStream(filePath).pipe(res)
    } else {
      console.log(chalk.hex('#ec1d35')('Application assembly files are missing.'))
    }
  })

  http.listen(options.port || PORT, () => {
    cb && cb()
  })
}
