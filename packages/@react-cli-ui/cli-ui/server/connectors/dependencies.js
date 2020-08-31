const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const semver = require('semver')

const { resolveModuleRoot } = require('../util/resolve-path')
const { resolveModule } = require('../util/modules')
const { npmInstall, npmUninstall } = require('../util/npm')
const { notify } = require('../util/notification')

const StaticMethods = require('./utils')

class DependenciesApi extends StaticMethods {
  constructor (client, db, folders) {
    super(db)
    this.client = client
    this.db = db
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
       // wanted: this.getVersion(id).wanted,
       // latest: this.getVersion(id).latest,
        type,
        baseFir: file
      })
    )
  }

  getVersion (id) {
    console.log(id)
    let latest, wanted
    const metadata = this.getMetadata(id)
    if(metadata) {
      latest = metadata['dist-tags'] ? metadata['dist-tags'].latest : ''
      const versions = Array.isArray(metadata.versions) ? metadata.versions : Object.keys(metadata.versions)
      wanted = semver.maxSatisfying(versions, versionRange)
    }
    return {
      latest,
      wanted
    }
  }

  getMetadata (pkg) {
    return fetch(`http://registry.npmjs.org/${pkg}`)
            .then(res => res.json())
            .then(json => {
              return json
            })
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
   
    let subprocess
    subprocess = npmInstall(name, filePath, dep)

    try {
      subprocess.stdout.pipe(process.stdout)
      subprocess.stdout.on('data', data => {
        const message = data.toString('utf8')
        message !== '\n' && this.client.emit('logging', {
          message: message.replace(/(\\n|\[36|\[39m|\[32m)/gmi, () => '')
        })
      })

      const { stdout } = await subprocess
      
      if(stdout) {
        this.client.emit('notification', {
          title: 'Success',
          message: `Dependency ${name} successfully installed`
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
    }

  }

  async uninstall (name) {
    const activeProjectId = this.db.get('config.lastOpenProject').value()
    const activeProject = this.db.get('projects').find({ id: activeProjectId }).value()

    const filePath = `/${activeProject.path.join('/')}`
    let subprocess
    subprocess = npmUninstall(name, filePath)
    try {
      subprocess.stdout.pipe(process.stdout)
      
      subprocess.stdout.on('data', data => {
        const message = data.toString('utf8')
        message !== '\n' && this.client.emit('logging', {
          message: message.replace(/(\\n|\[36|\[39m|\[32m)/gmi, () => '')
        })
      })

      const { stdout } = await subprocess
      
      if(stdout) {
        this.client.emit('notification', {
          title: 'Success',
          message: `Dependency ${name} successfully uninstalled`
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
    }
  }

  update ({ id }) {
    
  }

  updateAll () {

  }

}

module.exports = DependenciesApi
