const { Router } = require('express')
const fs = require('fs')
const router = Router()

// Get list folders
router.post('/', (req, res) => {
  try {
    const { url, hidden } = req.body

    const data = {
      folder: url || '/',
      isHidden: hidden || false,
      projects: []
    }

    fs.readdir(data.folder, (err, files) => {
      if (err) {
        return res.status(500).json({
          message: 'Ошибка работы с файловой системой',
          error: err
        })
      }

      files.forEach(file => {
        if (data.isHidden && !file.match(/\.[0-9a-z]{1,5}$/)) {
          return data.projects.push(file)
        } else if (!file.startsWith('.') && !file.match(/\.[0-9a-z]{1,5}$/)) {
          return data.projects.push(file)
        }
      })

      res.send(data.projects)
    })
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

// Create new folder
router.post('/create/', async (req, res) => {
  try {
    const { url: dir } = req.body
    if (dir && !fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true })
      return res.status(200).json({
        message: 'Folder successfully create'
      })
    } else {
      return res.status(400).json({
        message: 'Folder already exists'
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error })
  }
})

module.exports = router
