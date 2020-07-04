const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const router = Router()
// db
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const folderDbPath = path.normalize(__dirname + '../../../../db.json')
const adapter = new FileSync(folderDbPath)
const db = low(adapter)

// Get list project
router.get('/', (req, res) => {
  if (fs.existsSync(folderDbPath)) {
    res.send(db.get('projects').value())
  } else {
    console.log('dont find db')
  }
})

// Create new project
router.post('/create', (req, res) => {
  const {name, path, manager, preset} = req.body
  db.get('projects').push({ 
    id: db.get('projects').value().length + 1, 
    name,
    path,
    manager,
    preset
  }).write()
  res.send(db.get('projects').value())
})

// Get project by Id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.send(
    db.get('projects')
    .filter({ id })
    .value()
  )
})

// Delete project by Id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  console.log(id)
  if(id){
     db.get('projects')
    .remove({ id })
    .write()
    res.send(db.get('projects').value())
  } else {
    res.send(db.get('projects').value())
  }
})

// Clear DB
router.post('/clear', (req, res) => {
  db.get('projects')
    .remove().write()
  res.send(db.get('projects').value())
})

module.exports = router
