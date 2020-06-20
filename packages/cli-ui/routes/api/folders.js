const { Router } = require('express')
const fs = require('fs')
const router = Router()

router.get('/', (req, res) => {
  console.log('=> url', req.query.url)
  const folder = req.query.url || '/'
  const projects = []
  fs.readdir(folder, (err, files) => {
    if (err) {
      console.error(err)
      return
    }
    files.forEach(file => {
      projects.push(file)
    })
    res.send(projects.filter(str => !str.startsWith('.')))
  })
})

module.exports = router
