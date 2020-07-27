const fs = require('fs')
const path = require('path')
const FolderApi = require('./folders')
const { craNpm, craYarn } = require('../util/create')

class ProjectApi {
  constructor (client, db, folder) {
    this.client = client
    this.context = db
    this.folder = folder
  }

  /**
   * Open project
   * @param {number} id Number string
   */
  open (id) {

    if(id) {
      // Date
      this.context.get('projects').find({ id }).assign({
        openDate: Date.now()
      }).write()

      this.context.set('config.lastOpenProject', id).write()

      this.client.emit('lastOpenProject', {
        data: this.context.get('projects').find({ id })
      })
    }

  }

  /**
   * Get config
   */
  getConfig () {
    this.client.emit('config', {
      data: this.context.get('config').value()
    })
  }

  /**
   * Get list project
   */
  getProjects (folderDbPath) {
    if (fs.existsSync(folderDbPath)) {
      this.client.emit('projects', {
        data: this.context.get('projects').value()
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
  createProject (name, pathProject, manager, preset) {
    fs.readdir(path.join('/', ...pathProject, name), async (err, files) => {
      if (err) {
        let subprocess
        if (manager === 'npm') {
          subprocess = craNpm(pathProject, name)
        } else {
          subprocess = craYarn(pathProject, name)
        }

        try {
          subprocess.stdout.pipe(process.stdout)

          subprocess.stdout.on('data', data => {
            this.client.emit('check', {
              message: data.toString('utf8')
            })
          })

          const { stdout } = await subprocess

          // add db project
          if (stdout) {
            this.context.get('projects').push({
              id: this.context.get('projects').value().length + 1,
              name,
              path: pathProject,
              manager,
              preset,
              favorite: false
            }).write()
          }

          this.client.emit('notification', {
            message: 'Project successfully create'
          })
        } catch (error) {
          this.client.emit('erro', {
            message: 'Что-то пошло не так, попробуйте снова'
          })
        }
      }

      if (files) {
        this.client.emit('erro', {
          title: 'Ошибка создания проекта',
          message: `Директория ${name} - уже существует`
        })
      }
    })
  }

  /**
   * Get project by Id
   * @param {number} id ID project
   */
  getProjectById (id) {
    this.client.emit('project', {
      data: this.context.get('projects')
        .filter({ id })
        .value()
    })
  }

  /**
   * Delete project by Id
   * @param {number} id ID project
   */
  deleteProjectById (id) {
    if (id) {
      this.context.get('projects')
        .remove({ id })
        .write()
      this.client.emit('projects', {
        data: this.context.get('projects').value()
      })
    } else {
      this.client.emit('projects', {
        data: this.context.get('projects').value()
      })
    }
  }

  /**
   * Add Favorite project by id
   * @param {number} id ID project
   */
  addFavoriteProjectById (id) {
    const pr = this.context.get('projects')
      .find({ id })
      .value()
    if (pr.favorite) {
      this.context.get('projects')
        .find({ id })
        .assign({ favorite: false })
        .write()
    } else {
      this.context.get('projects')
        .find({ id })
        .assign({ favorite: true })
        .write()
    }
    this.client.emit('projects', {
      data: this.context.get('projects').value()
    })
  }

  /**
   * Clear db
   */
  clearDb () {
    this.context.get('projects')
      .remove().write()
    this.client.emit('projects', {
      data: this.context.get('projects').value()
    })
  }

  /**
   * Import Project
   */
  importProject (pathProject) {

    if (!fs.existsSync(path.join(`/${pathProject.join('/')}`, 'node_modules'))) {
      this.client.emit('erro-import-project', {
        title: 'NO_MODULES',
        message: 'It seems the project is missing the "node_modules" folder. Please check you installed the dependencies before importing.'
      })
    } else {
      const project = {
        id: this.context.get('projects').value().length + 1,
        path: pathProject,
        favorite: false
      }
  
      const packageData = this.folder.readPackage(path.join(`/${pathProject.join('/')}`))
                                  
      project.name = packageData.name
      this.context.get('projects').push(project).write()
      this.open(project.id)
      this.client.emit('notification', {
          message: 'Import successfully project'
      })
      this.client.emit('projects', {
        data: this.context.get('projects').value()
      })
    }

  }


  /**
  *  Open last project
  */
  autoOpenLastProject() {
    const id = this.context.get('config.lastOpenProject').value()
    if (id) {
      open(id)
    }
  }

}

module.exports = ProjectApi
