const FolderApi = require('./folders')

// WS api
function api(message, client) {

    if (message.type === "GET_FOLDERS") {
        console.log("message GET_FOLDERS", message)
        new FolderApi(client).getFolders(message.url, message.hidden)
    }

    // if(message.type === "GET_FOLDERS") {

    // }
}

module.exports = api
