const fs = require('fs-extra')
const path = require('path')

class FolderApi {
  constructor (client, db) {
    this.client = client
    this.context = db
  }

  /**
   * Get list folders
   * @param {string} url URL folder
   * @param {boolian} hidden Hidden folder with dot
   */
  getFolders (url, hidden) {
    try {
      const data = {
        folder: url || '/',
        isHidden: hidden || false,
        projects: []
      }

      fs.readdir(data.folder, (err, files) => {
        if (err) {
          this.client.emit('erro', {
            message: 'Ошибка работы с файловой системой',
            error: err
          })
        }

        if (files) {
          files.forEach(file => {
            if (data.isHidden && !file.match(/\.[0-9a-z]{1,5}$/)) {
              return data.projects.push(file)
            } else if (!file.startsWith('.') && !file.match(/\.[0-9a-z]{1,5}$/)) {
              return data.projects.push(file)
            }
          })
        }

        this.client.emit('folders', {
          data: data.projects
        })
      })
    } catch (error) {
      this.client.emit('erro', {
        message: 'Что-то пошло не так, попробуйте снова',
        error
      })
    }
  }

  /**
   * Create new folder
   *  @param {string} dir URL for new folder
   */
  async createFolder (dir) {
    try {
      if (dir && !fs.existsSync(dir)) {
        await fs.mkdirSync(dir, { recursive: true })
        this.client.emit('notification', {
          message: 'Folder successfully create'
        })
      } else {
        this.client.emit('notification', {
          message: 'Folder already exists'
        })
      }
    } catch (error) {
      this.client.emit('erro', {
        message: 'Что-то пошло не так, попробуйте снова',
        error
      })
    }
  }

  isPackage (file) {
    try {
      return fs.existsSync(path.join(file, 'package.json'))
    } catch (e) {
      console.warn(e.message)
    }
    return false
  }

  readPackage(file) {
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
    if (!isPackage(file)) return false
    try {
      const pkg = readPackage(file)
      return Object.keys(pkg.devDependencies || {}).includes('react')
    } catch (e) {
      if (process.env.DEV_SERVER) {
        console.log(e)
      }
    }
    return false
  }

  listFavorite () {
    this.client.emit('foldersFavorite', {
      data: this.context.get('foldersFavorite').value().map(
        file => this.generateFolder(file.id)
      )
    })
  }
  
  isFavorite (file) {
    return !!this.context.get('foldersFavorite').find({ id: file }).size().value()
  }
  
  setFavorite ({ file, favorite }) {
    const collection = this.context.get('foldersFavorite')
    if (favorite) {
      collection.push({ id: file }).write()
    } else {
      collection.remove({ id: file }).write()
    }
    this.client.emit('foldersFavorite', {
      data: this.context.get('foldersFavorite').value().map(
        file => this.generateFolder(file.id)
      )
    })
  }
}

module.exports = FolderApi
