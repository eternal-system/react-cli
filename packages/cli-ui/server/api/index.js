const FolderApi = require('./folders')
const ProjectApi = require('./projects')

// WS api
function api(message, client) {

    // Folders
    if (message.type === "GET_FOLDERS") {
        new FolderApi(client).getFolders(message.url, message.hidden)
    }

    if(message.type === "CREATE_FOLDER") {
        new FolderApi(client).createFolder(message.url)
    }

    // Projects
    if(message.type === "GET_PROJECTS") {
        new ProjectApi(client).getProjects()
    }
   
    if(message.type === "CREATE_FOLDER") {
        new ProjectApi(client).createProject(message.name, message.path, message.manager, message.preset)
    }

    if(message.type === "GET_PROJECT_BY_ID") {
        new ProjectApi(client).getProjectById(message.id)
    }

    if(message.type === "DELETE_PROJECT_BY_ID") {
        new ProjectApi(client).deleteProjectById(message.id)
    }

    if(message.type === "CLEAR_DB") {
        new ProjectApi(client).clearDb()
    }

}

module.exports = api
