const path = require('path')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const dbPath = path.resolve(process.cwd(), 'db.json')
const adapter = new FileAsync(dbPath, {
  defaultValue: {
    projects: [],
    foldersFavorite: [],
    tasks: [],
    config: {}
  }
})
const db = low(adapter)

module.exports = {
  db,
  dbPath
}
