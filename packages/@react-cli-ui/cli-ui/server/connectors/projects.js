const fs = require('fs')
const path = require('path')

const { craNpm, craYarn } = require('../util/create')
const { v4: uuid } = require('uuid')

const StaticMethods = require('./utils')

class ProjectApi extends StaticMethods {
  constructor (client, db, folder) {
    super(db)
    this.client = client
    this.db = db
    this.folder = folder
  }

  /**
   * Open project
   * @param {number} id Number string
   */
  open (id) {
    if (id) {
      // Date
      this.db.get('projects').find({ id }).assign({
        openDate: Date.now()
      }).write()

      this.db.set('config.lastOpenProject', id).write()

      this.client.emit('lastOpenProject', {
        data: this.db.get('projects').find({ id })
      })
    }
  }

  /**
   * Get config
   */
  getConfig () {
    this.client.emit('config', {
      data: this.db.get('config').value()
    })
  }

  /**
   * Get list project
   */
  getProjects (folderDbPath) {
    if (fs.existsSync(folderDbPath)) {
      this.db.get('projects')
        .value()
        .forEach((project) => {
          if (!fs.existsSync(path.join('/', ...project.path.slice(0,-1), project.name))) {
            this.db.get('projects').remove({ id: project.id }).write()
          }
        })
      this.client.emit('projects', {
        data: this.db.get('projects').value()
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
            const message = data.toString('utf8')
            message !== '\n' && this.client.emit('logging', {
              message: message.replace(/(\\n|\[36|\[39m|\[32m)/gmi, () => '')
            })
          })

          const { stdout } = await subprocess

          // add db project
          if (stdout) {
            const id = uuid()
            this.db.set('config.lastOpenProject', id).write()
            this.db.get('projects')
              .push({
                id,
                name,
                path: [...pathProject, name],
                manager,
                preset,
                favorite: false,
                type: 'react',
                openDate: Date.now()
              })
              .write()
              .then(() => this.client.emit('notification', {
                title: 'Success',
                message: `Project ${name} successfully create`
              }))
          }
        } catch (error) {
          this.client.emit('erro', {
            title: 'Failure',
            message: `Project ${name} create error`,
            error
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
      data: this.db.get('projects')
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
      this.db.get('projects')
        .remove({ id })
        .write()
      this.client.emit('projects', {
        data: this.db.get('projects').value()
      })
    } else {
      this.client.emit('projects', {
        data: this.db.get('projects').value()
      })
    }
  }

  /**
   * Add Favorite project by id
   * @param {number} id ID project
   */
  addFavoriteProjectById (id) {
    const pr = this.db.get('projects')
      .find({ id })
      .value()
    if (pr.favorite) {
      this.db.get('projects')
        .find({ id })
        .assign({ favorite: false })
        .write()
    } else {
      this.db.get('projects')
        .find({ id })
        .assign({ favorite: true })
        .write()
    }
    this.client.emit('projects', {
      data: this.db.get('projects').value()
    })
  }

  /**
   * Clear db
   */
  clearDb () {
    this.db.get('projects')
      .remove().write()
    this.client.emit('projects', {
      data: this.db.get('projects').value()
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
        id: uuid(),
        path: pathProject,
        favorite: false
      }
      const packageData = this.folder.readPackage(path.join(`/${pathProject.join('/')}`))
      project.name = packageData.name
      this.db.get('projects').push(project).write()
      this.open(project.id)
      this.client.emit('notification', {
        message: 'Import successfully project'
      })
      this.client.emit('projects', {
        data: this.db.get('projects').value()
      })
    }
  }

  /**
  *  Open last project
  */
  autoOpenLastProject () {
    const id = this.db.get('config.lastOpenProject').value()
    if (id) {
      open(id)
    }
  }
}

module.exports = ProjectApi
