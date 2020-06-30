const Lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')

const filePath = path.normalize(__dirname + "/../../db.json")
const db = new Lowdb(new FileSync(filePath))

// Empty DB
db.defaults({
  projects: [],
  foldersFavorite: [],
  tasks: [],
  config: {}
}).write()

module.exports = {
  db
}