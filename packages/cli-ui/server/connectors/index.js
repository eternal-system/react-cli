const FolderApi = require('./folders')
const ProjectApi = require('./projects')
const LogsApi = require('./logs')

// WS api
function api (message, client) {
  const folder = new FolderApi(client)
  const project = new ProjectApi(client)
  const logs = new LogsApi(client)
  const { type, name, url, id, hidden, path, manager, preset, log } = message

  switch (type) {
    // Folders
    case 'GET_FOLDERS':
      folder.getFolders(url, hidden)
      break

    case 'CREATE_FOLDER':
      folder.createFolder(url)
      break

    // Projects
    case 'OPEN_PROJECT':
      project.open(id)
      break

    case 'GET_PROJECTS':
      project.getProjects()
      break

    case 'CREATE_PROJECT':
      project.createProject(name, path, manager, preset)
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

    case 'CLEAR_DB':
      project.clearDb()
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
}

module.exports = api
