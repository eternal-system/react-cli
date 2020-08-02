const fs = require('fs-extra')
const path = require('path')

class StaticMethods {
  constructor (client, db) {
    this.client = client
    this.db = db
  }

  isPackage (file) {
    try {
      return fs.existsSync(path.join(file, 'package.json'))
    } catch (e) {
      console.warn(e.message)
    }
    return false
  }

  readPackage (file) {
    const pkgFile = path.join(file, 'package.json')
    if (fs.existsSync(pkgFile)) {
      const pkg = fs.readJsonSync(pkgFile)
      return pkg
    }
  }

  generateFolder (file) {
    return {
      name: path.basename(file),
      path: file
    }
  }

  isReactProject (file) {
    if (!this.isPackage(file)) return false
    try {
      const pkg = this.readPackage(file)
      return Object.keys(pkg.devDependencies || {}).includes('react')
    } catch (e) {
      if (process.env.DEV_SERVER) {
        console.log(e)
      }
    }
    return false
  }

  isFavorite (file) {
    return !!this.db.get('foldersFavorite').find({ id: file }).size().value()
  }
}

module.exports = StaticMethods
