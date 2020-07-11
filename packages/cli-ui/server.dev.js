require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.js')
const PORT = process.env.SERVER_PORT || 8080
const app = express()
const filePath = path.resolve(__dirname, 'dist', 'index.html')

// logger
const pino = require('pino')
const expressPino = require('express-pino-logger')
const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const expressLogger = expressPino({ logger })

// db
if (!fs.existsSync('db.json')) {
  console.log('create new db')
  require('./server/util/db')
}

// logger
app.use(expressLogger)

app.use(express.json({ extended: true }))
app.use(require('./server/routes'))

/* static server */
if (process.env.DEV_SERVER.trim() === 'true') {
  app.use(webpackHotMiddleware(webpack(webpackConfig)))
  app.use('/', express.static(path.join(__dirname, 'dist')))

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
}

app.listen(PORT, () => {
  logger.info('Server running on port %d', PORT)
})
