const path = require('path')
const fs = require('fs')
// const fetch = require('node-fetch')
// const semver = require('semver')

const { resolveModuleRoot } = require('../util/resolve-path')
const { resolveModule } = require('../util/modules')
const { npmInstall, npmUninstall } = require('../util/npm')
const { notify } = require('../util/notification')

const StaticMethods = require('./utils')

class DependenciesApi extends StaticMethods {
  constructor (client, db, folders, logs) {
    super(db)
    this.client = client
    this.db = db
    this.logs = logs
    this.folders = folders
    this.dependencies = []
  }

  list () {
    const activeProjectId = this.db.get('config.lastOpenProject').value()
    const activeProject = this.db.get('projects').find({ id: activeProjectId }).value()
    const filePath = `/${activeProject.path.join('/')}`
    const pkg = this.readPackage(path.join(filePath))

    if (pkg) {
      this.dependencies = this.dependencies.concat(
        this.findDependencies(pkg.devDependencies || {}, 'devDependencies', filePath)
      )
      this.dependencies = this.dependencies.concat(
        this.findDependencies(pkg.dependencies || {}, 'dependencies', filePath)
      )
    }
    this.client.emit('dependencies', {
      data: this.dependencies
    })
  }

  findDependencies (deps, type, file) {
    return Object.keys(deps).map(
      id => ({
        id,
        versionRange: deps[id],
        installed: this.isInstalled({ id, file }),
        website: this.getLink({ id, file }),
        type,
        baseFir: file
      })
    )
  }

  isInstalled ({ id, file }) {
    const resolvedPath = this.getPath({ id, file })
    return resolvedPath && fs.existsSync(resolvedPath)
  }

  getPath ({ id, file }) {
    const filePath = resolveModule(path.join(id, 'package.json'), file)
    if (!filePath) return
    return resolveModuleRoot(filePath, id)
  }

  getLink ({ id, file }) {
    const pkg = this.readPackageDep({ id, file })
    return pkg.homepage ||
          (pkg.repository && pkg.repository.url) ||
          `https://www.npmjs.com/package/${id.replace('/', '%2F')}`
  }

  readPackageDep ({ id, file }) {
    try {
      return this.readPackage(this.getPath({ id, file }))
    } catch (e) {
      console.log(e)
    }
    return {}
  }

  async install (name, dep) {
    const activeProjectId = this.db.get('config.lastOpenProject').value()
    const activeProject = this.db.get('projects').find({ id: activeProjectId }).value()

    const filePath = `/${activeProject.path.join('/')}`

    const subprocess = npmInstall(name, filePath, dep)

    try {
      subprocess.stdout.pipe(process.stdout)
      subprocess.stdout.on('data', data => {
        const message = data.toString('utf8')
        message !== '\n' && this.client.emit('logging', {
          message: message.replace(/(\\n|\[36|\[39m|\[32m)/gmi, () => '')
        })
      })

      const { stdout } = await subprocess

      if (stdout) {
        this.client.emit('notification', {
          title: 'Success',
          message: `Dependency ${name} successfully installed`
        })
        this.logs.add({
          message: `Dependency ${name} successfully installed`,
          type: 'info'
        })
        notify({
          title: 'Dependency installed',
          message: `Dependency ${name} successfully installed`,
          icon: 'done'
        })
      }
    } catch (error) {
      this.client.emit('erro', {
        title: 'Failure',
        message: `npm install ${name} error`,
        error
      })
      this.logs.add({
        message: `npm install ${name} error`,
        type: 'info'
      })
    }
  }

  async uninstall (name) {
    const activeProjectId = this.db.get('config.lastOpenProject').value()
    const activeProject = this.db.get('projects').find({ id: activeProjectId }).value()

    const filePath = `/${activeProject.path.join('/')}`
    const subprocess = npmUninstall(name, filePath)
    try {
      subprocess.stdout.pipe(process.stdout)

      subprocess.stdout.on('data', data => {
        const message = data.toString('utf8')
        message !== '\n' && this.client.emit('logging', {
          message: message.replace(/(\\n|\[36|\[39m|\[32m)/gmi, () => '')
        })
      })

      const { stdout } = await subprocess
      if (stdout) {
        this.client.emit('notification', {
          title: 'Success',
          message: `Dependency ${name} successfully uninstalled`
        })
        this.logs.add({
          message: `Dependency ${name} successfully uninstalled`,
          type: 'info'
        })
        notify({
          title: 'Dependency uninstalled',
          message: `Dependency ${name} successfully uninstalled`,
          icon: 'done'
        })
      }
    } catch (error) {
      this.client.emit('erro', {
        title: 'Failure',
        message: `npm uninstall ${name} error`,
        error
      })
      this.logs.add({
        message: `npm uninstall ${name} error`,
        type: 'info'
      })
    }
  }

  update ({ id }) {
  }

  updateAll () {
  }
}

module.exports = DependenciesApi
