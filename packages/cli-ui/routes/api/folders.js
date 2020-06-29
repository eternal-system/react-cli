const { Router } = require('express')
const fs = require('fs')
const router = Router()

// Get list folders
router.get('/', (req, res) => {
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

// Create new folder
router.post('/create/', (req, res) => {
  const dir = req.query.url
  if (dir) {
    if (!fs.existsSync(dir)) {
      try {
        fs.mkdirSync(dir)
        console.log('create')
        res.send('Folder successfully create')
      } catch (error) {
        res.send(error)
      }
    } else {
      res.send('Folder already exists')
    }
  }
})

module.exports = router
