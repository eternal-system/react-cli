const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const db = require('../../util/db')
const router = Router()

// Get list project
router.get('/', (req, res) => {
  console.log('=> url', req.query.url)
  const folder = req.query.url || '/'
  const projects = []

  //  TODO
  // 1. проверить наличие db.json
  // 2. если db.json нет то создаем новый db.json
  // 3. возращаяем список projects => db.json

  // 1
  // const folderDbPath = path.normalize(__dirname + '../../../db.json')

  // // проверка существования файла
  // fs.access(folderDbPath, fs.constants.F_OK, (err) => {
  //   console.log(`${folderDbPath} ${err ? 'не существует' : 'существует'}`)
  // })
  // db()

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

// Create new project
// router.post('/create', () => {

// })

module.exports = router
