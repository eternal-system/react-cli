const { db: dbAsync, dbPath } = require('../util/db')
const FolderApi = require('./folders')
const ProjectApi = require('./projects')
const LogsApi = require('./logs')
const DependenciesApi = require('./dependencies')

// WS api
function api (message, client) {
  dbAsync.then(db => {
    const folder = new FolderApi(client, db)
    const project = new ProjectApi(client, db, folder)
    const dependencies = new DependenciesApi(client, db, folder)
    const logs = new LogsApi(client, db)
    const { type, name, url, id, hidden, path, manager, preset, log, file } = message

    switch (type) {
    // Folders
      case 'GET_FOLDERS':
        folder.getFolders(url, hidden)
        break

      case 'CREATE_FOLDER':
        folder.createFolder(url)
        break

        // Favorite folder
      case 'SET_FAVORITE':
        folder.setFavorite(file)
        break

        // Last open project
      case 'GET_LAST_OPEN_PROJECT':
        folder.getLastOpenProject()
        break

      case 'LIST_FAVORITE':
        folder.listFavorite()
        break

        // Projects
      case 'OPEN_PROJECT':
        project.open(id)
        break

      case 'GET_PROJECTS':
        project.getProjects(dbPath)
        break

      case 'CREATE_PROJECT':
        project.createProject(name, path, manager, preset)
        break

      case 'IMPORT_PROJECT':
        project.importProject(path)
        break

      case 'GET_PROJECT_BY_ID':
        project.getProjectById(id)
        break

      case 'DELETE_PROJECT_BY_ID':
        project.deleteProjectById(id)
        break

      case 'ADD_FAVORITE_BY_ID':
        project.addFavoriteProjectById(id)
        break

      case 'OPEN_LAST_PROJECT':
        project.autoOpenLastProject()
        break

      case 'CLEAR_DB':
        project.clearDb()
        break

        // Dependencies
      case 'GET_LIST_DEPENDINCIES':
        dependencies.list(path)
        break

        // Config
      case 'GET_CONFIG':
        project.getConfig()
        break

        // Logs
      case 'GET_LOGS':
        logs.list()
        break

      case 'ADD_LOGS':
        logs.add(log)
        break

      case 'GET_LAST_LOG':
        logs.last()
        break

      case 'CLEAR_LOG':
        logs.clear()
        break
    }
  })
}

module.exports = api
