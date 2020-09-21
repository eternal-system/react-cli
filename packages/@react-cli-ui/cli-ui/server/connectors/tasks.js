const StaticMethods = require('./utils')
const path = require('path')
const { notify } = require('../util/notification')
const { runScripts } = require('../util/scripts')

class TaskApi extends StaticMethods {
  constructor (client, db) {
    super(db)
    this.client = client
    this.db = db
    this.tasks = {}
  }

  list () {
    const activeProjectId = this.db.get('config.lastOpenProject').value()
    const activeProject = this.db.get('projects').find({ id: activeProjectId }).value()

    const filePath = `/${activeProject.path.join('/')}`
    const pkg = this.readPackage(path.join(filePath))

    if (pkg.scripts) {
      this.tasks = pkg.scripts
      this.client.emit('tasks', {
        data: this.tasks
      })
    }
  }

  async run (name) {
    const activeProjectId = this.db.get('config.lastOpenProject').value()
    const activeProject = this.db.get('projects').find({ id: activeProjectId }).value()

    const filePath = `/${activeProject.path.join('/')}`

    const subprocess = runScripts(name, filePath)
    const { stdout } = await subprocess
    if(stdout) {
      notify({
        title: 'Script run',
        message: `Script ${name} successfully`,
        icon: 'done'
      })
    } else {
      this.client.emit('erro', {
        title: 'Failure',
        message: `script run ${name} error`
      })
    }
  }
}

module.exports = TaskApi
