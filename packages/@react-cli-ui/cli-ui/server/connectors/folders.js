const fs = require('fs-extra')

const StaticMethods = require('./utils')

class FolderApi extends StaticMethods {
  constructor (client, db, logs) {
    super(db)
    this.client = client
    this.db = db
    this.logs = logs
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
        projects: [],
        project: []
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
          data: data.projects,
          project: data.project
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

  setFavorite ({ file, favorite }) {
    const collection = this.db.get('foldersFavorite')
    if (favorite) {
      collection.push({ id: file }).write()
    } else {
      collection.remove({ id: file }).write()
    }
    this.client.emit('foldersFavorite', {
      data: this.db.get('foldersFavorite').value().map(
        file => this.generateFolder(file.id)
      )
    })
  }
}

module.exports = FolderApi
