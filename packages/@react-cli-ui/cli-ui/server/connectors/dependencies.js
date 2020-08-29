const path = require('path')
const fs = require('fs')
const fetch = require('node-fetch')
const semver = require('semver')

const { resolveModuleRoot } = require('../util/resolve-path')
const { resolveModule } = require('../util/modules')

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

  getMetadata(pkg) {
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

  // getVersion ({ id, installed, versionRange, baseDir }) {
  //   let current

  //   // Read module package.json
  //   if (installed) {
  //     const pkg = this.readPackage({ id, file: baseDir })
  //     current = pkg.version
  //   } else {
  //     current = null
  //   }
  
  //   // Metadata
  //   let latest, wanted
  //   const metadata = await getMetadata(id)
  //   if (metadata) {
  //     latest = metadata['dist-tags'].latest
  
  //     const versions = Array.isArray(metadata.versions) ? metadata.versions : Object.keys(metadata.versions)
  //     wanted = semver.maxSatisfying(versions, versionRange)
  //   }
  
  //   if (!latest) latest = current
  //   if (!wanted) wanted = current
  
  //   return {
  //     current,
  //     latest,
  //     wanted,
  //     range: versionRange,
  //   }
  // }

  // async function getMetadata (id, context) {
  //   let metadata = metadataCache.get(id)
  //   if (metadata) {
  //     return metadata
  //   }
  
  //   try {
  //     metadata = await (new PackageManager({ context: cwd.get() })).getMetadata(id)
  //   } catch (e) {
  //     // No connection?
  //   }
  
  //   if (metadata) {
  //     metadataCache.set(id, metadata)
  //     return metadata
  //   } else {
  //     log('Dependencies', chalk.yellow('Can\'t load metadata'), id)
  //   }
  // }

  install () {

  }

  uninstall ({ id }) {

  }

  update ({ id }) {
    
  }

  updateAll () {

  }

}

module.exports = DependenciesApi
