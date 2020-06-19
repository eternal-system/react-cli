require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.dev.js')
const port = process.env.SERVER_PORT || 8080
const app = express()
const distPath = path.resolve(__dirname, 'dist')
const filePath = path.resolve(__dirname, 'dist', 'index.html')

app.use(require('./routes'))

/* static server */
if (!process.env.DEV) {
  console.log('SSR start')

  app.use(express.json({ extended: true }))
  app.use(express.static(distPath))

  app.get('/', function (req, res) {
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

  app.get('/create', function (req, res) {
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

/* api */

/**
 * TODO
 * 1. current folder
 * 2. get list up by current folder name
 * 3. get list down by current filder name
 */
// app.get('/api/projects', (req, res) => {
//   console.log('=> url', req.query.url)
//   const folder = req.query.url || '/'
//   const projects = []
//   fs.readdir(folder, (err, files) => {
//     if (err) {
//       console.error(err)
//       return
//     }
//     files.forEach(file => {
//       projects.push(file)
//     })
//     res.send(projects.filter(str => !str.startsWith('.')))
//   })
// })

// app.get('/api/folder', (req, res) => {
//   res.send('folder')
// })

app.listen(port)
console.log('server started on port ' + port)
