const path = require('path')
const fs = require('fs')
const { resolveModuleRoot } = require('../util/resolve-path')
const { resolveModule } = require('../util/modules')

class DependenciesApi {
    constructor (client, db, folders) {
        this.client = client
        this.context = db
        this.folders = folders
        this.dependencies = []
    }

    list(file) {
       
        const filePath = `/${file.join('/')}`
        const pkg = this.folders.readPackage(path.join(filePath))
       
        if(pkg){
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
        const pkg = this.readPackage({ id, file })
        return pkg.homepage ||
          (pkg.repository && pkg.repository.url) ||
          `https://www.npmjs.com/package/${id.replace('/', '%2F')}`
    }

    readPackage ({ id, file }) {
        try {
          return this.folders.readPackage(this.getPath({ id, file }))
        } catch (e) {
          console.log(e)
        }
        return {}
    }

}

module.exports = DependenciesApi