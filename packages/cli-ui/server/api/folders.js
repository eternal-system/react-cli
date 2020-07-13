const fs = require('fs')


class FolderApi {
    
    constructor(client) {
        this.client = client
    }

     /**
     * Get list folders
     */
    getFolders(url, hidden) {
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
            
                if(files){
                    files.forEach(file => {
                        if (data.isHidden && !file.match(/\.[0-9a-z]{1,5}$/)) {
                        return data.projects.push(file)
                        } else if (!file.startsWith('.') && !file.match(/\.[0-9a-z]{1,5}$/)) {
                        return data.projects.push(file)
                        }
                    })
                }
                
              this.client.emit('folders', data.projects)
            })
          } catch (error) {
            this.client.emit('erro', { message: 'Что-то пошло не так, попробуйте снова' })
        } 
    }

    /**
     * Create new folder
     */
    createFolder() {

    }
}

module.exports = FolderApi
