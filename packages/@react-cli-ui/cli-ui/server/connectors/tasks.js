const StaticMethods = require('./utils')
const path = require('path')
const { notify } = require('../util/notification')
const { runScripts } = require('../util/scripts')

class TaskApi extends StaticMethods {
  constructor (client, db, logs) {
    super(db)
    this.client = client
    this.db = db
    this.tasks = {}
    this.childProcess = {}
    this.logs = logs
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
    this.db.set('tasks', []).write()
    this.db.get('tasks').push({
      projectId: activeProjectId,
      status: name,
      pid: subprocess.pid.toString()
    }).write()

    try {
      const { stdout } = await subprocess
      if (stdout) {
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
    } catch (error) {
      this.client.emit('erro', {
        title: 'Failure',
        message: `script run ${name} error`
      })
    }
  }

  stop () {
    const activeProjectId = this.db.get('config.lastOpenProject').value()
    const child = this.db.get('tasks').find({ projectId: activeProjectId }).value()
    require('child_process').exec(`kill -9 ${child.pid}`, (err) => {
      if (err) {
        console.log('err', err)
      } else {
        notify({
          title: 'Script stop',
          message: `Script ${child.pid} successfully`,
          icon: 'done'
        })
      }
    })
  }
}

module.exports = TaskApi
