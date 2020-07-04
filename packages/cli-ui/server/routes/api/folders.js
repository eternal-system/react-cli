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
    res.send(projects.filter(str => !str.startsWith('.') && !str.match(/\.[0-9a-z]{1,5}$/)))
  })
})

// Create new folder
router.post('/create/', async (req, res) => {
  try {
    const dir = req.query.url
    if (dir && !fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true })
      res.send('Folder successfully create')
    } else {
      res.send('Folder already exists')
    }
  } catch (error) {
    res.send(error)
  }
})

module.exports = router
