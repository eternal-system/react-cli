const fs = require('fs')
const path = require('path')
// db
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const folderDbPath = path.normalize(path.join(__dirname, '../../db.json'))
const adapter = new FileSync(folderDbPath)
const db = low(adapter)
const { craNpm, craYarn } = require('../util/create')

class ProjectApi {
    
    constructor(client) {
        this.client = client
    }

    /**
     * Get list project
     */
    getProjects() {
        if (fs.existsSync(folderDbPath)) {
            this.client.emit('projects', { 
                data: db.get('projects').value() 
            })
          } else {
            this.client.emit('erro', { 
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    }

     /**
     * Create new project
     * @param {string} name Name new project
     * @param {array} pathProject Path new project
     * @param {string} manager Manager new project (npm/yarn)
     * @param {string} preset Preset new project (create-react-app/other...)
     */
    async createProject(name, pathProject, manager, preset) {
    
        let subprocess
        if (manager === 'npm') {
            subprocess = craNpm(pathProject, name)
        } else {
            subprocess = craYarn(pathProject, name)
        }
        subprocess.stdout.pipe(process.stdout)
        try {
            
            const { stdout } = await subprocess
            console.log('stdout', stdout)

            // add db project
            if (stdout) {
                db.get('projects').push({
                    id: db.get('projects').value().length + 1,
                    name,
                    path: pathProject,
                    manager,
                    preset
                }).write()
            }

            this.client.emit("notification",{
                message: 'Project successfully create'
            })
        } catch (error) {
            this.client.emit('erro', { 
                message: 'Что-то пошло не так, попробуйте снова'
            })
        }
    }

     /**
     * Get project by Id
     * @param {number} id ID project
     */
    getProjectById(id) {
        this.client.emit('project', {
            data: db.get('projects')
              .filter({ id })
              .value()
        })
    }

     /**
     * Delete project by Id
     * @param {number} id ID project
     */
    deleteProjectById(id) {
        if (id) {
            db.get('projects')
            .remove({ id })
            .write()
            this.client.emit('projects', { 
                data: db.get('projects').value() 
            })
        } else {
            this.client.emit('projects', { 
                data: db.get('projects').value() 
            })
        }
    }

     /**
     * Clear db
     */
    clearDb() {
        db.get('projects')
          .remove().write()
          
        this.client.emit('projects', { 
            data: db.get('projects').value() 
        })
    }
}

module.exports = ProjectApi