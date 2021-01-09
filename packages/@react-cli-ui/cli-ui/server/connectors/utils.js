const fs = require('fs-extra')
const path = require('path')
var os = require('os')
const { get } = require('lodash')

const { runConsoleComand } = require('../util/scripts')

class StaticMethods {
  constructor (db) {
    this.db = db
    this.drives = []
  }

  get hardDrive () {
    return this.db.get('config.hardDrive', '').value()
  }

  /**
   * Создание информационного объекта о папке
   * @param {string} pathFolder - запрашиваемый путь
   * @param {string} namefolder - название директории
   */
  checkFramework (pathFolder, namefolder = '') {
    const folderItem = { name: namefolder }
    const packageJson = path.join(pathFolder, namefolder, 'package.json')
    const exist = fs.existsSync(packageJson)
    if (exist) {
      const packageJsonFile = fs.readFileSync(packageJson, 'utf8')
      const packageJsonObj = JSON.parse(packageJsonFile)
      if (get(packageJsonObj, 'dependencies.react')) {
        folderItem.type = 'react'
      } else if (get(packageJsonObj, 'dependencies.vue')) {
        folderItem.type = 'vue'
      } else {
        folderItem.type = 'unknown'
      }
    } else {
      folderItem.type = 'empty'
    }
    return folderItem
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

  /**
   * Формирование информационного объекта папки
   * @param {string} file
   */
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

  async getHardDriveList () {
    if (this.drives.length) return this.drives
    let subprocess

    if (os.platform() === 'win32') {
      subprocess = await runConsoleComand('fsutil fsinfo drives')
      this.drives = subprocess.stdout.toString('utf8').match(/[A-Z]:/g).map(drive => `${drive}/`)
    }

    if (!this.hardDrive) {
      this.db.set('config.hardDrive', this.drives[0]).write()
    }

    return this.drives
  }
}

module.exports = StaticMethods
