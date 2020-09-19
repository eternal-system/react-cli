require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack/config.js')
const PORT = process.env.SERVER_PORT || 8081
const chalk = require('chalk')
const app = express()
const filePath = path.resolve(__dirname, 'dist', 'index.html')

// logger
const pino = require('pino')
const expressPino = require('express-pino-logger')
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const expressLogger = expressPino({ logger })

// ws
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const api = require('./server/connectors')

app.set('socket', io)

io.on('connection', (client) => {
  console.log(chalk.hex('#009688')('🚀 Socket: Connection Succeeded.'))

  client.on('message', message => api(message, client))

  client.on('disconnect', () => {
    console.log(chalk.hex('#009688')('❌ Socket: Disconnected.'))
  })
})

// logger
app.use(expressLogger)

app.use(express.json({ extended: true }))
app.use(require('./server/routes'))

/* static server */

app.use(webpackHotMiddleware(webpack(webpackConfig)))
app.use('/', express.static(path.join(__dirname, 'dist')))

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

http.listen(PORT, () =>
  console.log(chalk.hex('#009688')('🌠 Server - running on port:', PORT))
)