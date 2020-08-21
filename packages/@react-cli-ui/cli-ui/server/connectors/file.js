const StaticMethods = require('./utils')
const launch = require('launch-editor')

class FileApi extends StaticMethods {
  constructor (client, db) {
    super(db)
    this.client = client
    this.db = db
  }

  /**
   * Open in editor propject
   * @param {string} path Path folder project
   */
  async openInEditor (path) {
    const currentPath = `/${path.join('/')}`
    launch(
      currentPath,
      process.env.EDITOR || 'code',
      (fileName, errorMsg) => {
        console.error(`Unable to open '${fileName}'`, errorMsg)
        this.client.emit('erro', {
          message: 'Ошибка работы с файловой системой',
          error: errorMsg
        })
      })
  }
}

module.exports = FileApi
