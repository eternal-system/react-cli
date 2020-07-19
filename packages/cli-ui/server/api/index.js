const FolderApi = require('./folders')
const ProjectApi = require('./projects')

// WS api
function api(message, client) {

    const folder = new FolderApi(client)
    const project = new ProjectApi(client)
    const { type, name, url, id, hidden, path, manager, preset } = message

    // Folders
    if (type === "GET_FOLDERS") {
        folder.getFolders(url, hidden)
    }

    if(type === "CREATE_FOLDER") {
        folder.createFolder(url)
    }

    // Projects
    if(type === "GET_PROJECTS") {
        project.getProjects()
    }
   
    if(type === "CREATE_FOLDER") {
        project.createProject(name, path, manager, preset)
    }

    if(type === "GET_PROJECT_BY_ID") {
        project.getProjectById(id)
    }

    if(type === "DELETE_PROJECT_BY_ID") {
        project.deleteProjectById(id)
    }

    if(type === "GET_FAVORITE_PROJECTS") {
        project.getFavoriteProjects()
    }

    if(type === "ADD_FAVORITE_BY_ID") {
        project.addFavoriteProjectById(id)
    }

    if(type === "EXCLUDE_FAVORITE_BY_ID") {
        project.excludeFavoriteProjectById(id)
    }

    if(type === "DELETE_FAVORITE_BY_ID") {
        project.deleteFavoriteProjectById(id)
    }

    if(type === "CLEAR_DB") {
        project.clearDb()
    }

}

module.exports = api
