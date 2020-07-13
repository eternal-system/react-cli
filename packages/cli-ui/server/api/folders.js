const fs = require('fs')


class FolderApi {
    
    constructor(client) {
        this.client = client
    }

     /**
     * Get list folders
     * @param {string} url URL folder
     * @param {boolian} hidden Hidden folder with dot
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
    async createFolder(dir) {
        try {
            if (dir && !fs.existsSync(dir)) {
              await fs.mkdirSync(dir, { recursive: true })
              this.client.emit("notification",{
                message: 'Folder successfully create'
              })
            } else {
                this.client.emit("notification",{
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
}

module.exports = FolderApi
