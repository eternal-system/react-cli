const fs = require('fs-extra')

const StaticMethods = require('./utils')

class FolderApi extends StaticMethods {
  constructor (client, db, logs) {
    super(db)
    this.client = client
    this.db = db
    this.logs = logs
  }

  setHardDrive (hardDrive) {
    this.db.set('config.hardDrive', hardDrive).write()
    this.client.emit('selectedHardDrive', {
      data: this.hardDrive
    })
    this.getFolders()
  }

  /**
   * Get list folders
   * @param {string} url URL folder
   * @param {boolian} hidden Hidden folder with dot
   */
  async getFolders (url, hidden) {
    try {
      await this.getHardDriveList()

      const data = {
        folder: this.hardDrive + (url || '/'),
        isHidden: hidden || false,
        projects: [],
        project: []
      }

      if (this.drives.length) {
        this.client.emit('selectedHardDrive', {
          data: this.db.get('config.hardDrive', '').value()
        })
      }

      fs.readdir(data.folder, (err, files) => {
        if (err) {
          this.client.emit('erro', {
            message: 'Ошибка работы с файловой системой',
            error: err
          })
          this.logs.add({
            message: 'Ошибка работы с файловой системой',
            type: 'info'
          })
        }

        if (files) {
          files.forEach(file => {
            if (data.isHidden && !file.match(/\.[0-9a-z]{1,5}$/)) {
              data.project.push(this.checkFramework(data.folder, file))
              return data.projects.push(file)
            } else if (!file.startsWith('.') && !file.match(/\.[0-9a-z]{1,5}$/)) {
              data.project.push(this.checkFramework(data.folder, file))
              return data.projects.push(file)
            }
          })
        }

        this.client.emit('folders', {
          folder: data.folder,
          project: data.project,
          drives: this.drives
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
      const dirUrl = this.hardDrive + dir
      if (dirUrl && !fs.existsSync(dirUrl)) {
        await fs.mkdirSync(dirUrl, { recursive: true })
        this.client.emit('notification-folder', {
          message: 'Folder successfully create'
        })
        this.logs.add({
          message: 'Folder successfully create',
          type: 'info'
        })
      } else {
        this.client.emit('notification-folder', {
          message: 'Folder already exists'
        })
        this.logs.add({
          message: 'Folder already exists',
          type: 'info'
        })
      }
    } catch (error) {
      this.client.emit('erro', {
        message: 'Что-то пошло не так, попробуйте снова',
        error
      })
    }
  }

  listFavorite () {
    this.client.emit('foldersFavorite', {
      data: this.db.get('foldersFavorite').value().map(
        file => this.generateFolder(file.id)
      )
    })
  }

  getLastOpenProject () {
    this.client.emit('lastOpenProject', {
      data: this.db.get('config.lastOpenProject', false).value()
    })
  }

  setFavorite ({ file: url, favorite: isFavorite }) {
    const collection = this.db.get('foldersFavorite')
    if (isFavorite) {
      collection.push({ id: url }).write()
    } else {
      collection.remove({ id: url }).write()
    }
    this.client.emit('foldersFavorite', {
      data: this.db.get('foldersFavorite').value().map(
        favoriteFoulder => this.generateFolder(favoriteFoulder.id)
      )
    })
  }
}

module.exports = FolderApi
