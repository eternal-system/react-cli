const path = require('path')
const { resolveModuleRoot } = require('../util/resolve-path')

class DependenciesApi {
    constructor (client, db, folders) {
        this.client = client
        this.context = db
        this.folders = folders
        this.dependencies = []
    }

    list(file) {
        const pkg = this.folders.readPackage(path.join(`/${file.join('/')}`))
        this.dependencies = this.dependencies.concat(
            findDependencies(pkg.devDependencies || {}, 'devDependencies', file)
        )
        this.dependencies = this.dependencies.concat(
            findDependencies(pkg.dependencies || {}, 'dependencies', file)
        )
    }

    findDependencies (deps, type, file) {
        return Object.keys(deps).map(
          id => ({
            id,
            versionRange: deps[id],
            installed: isInstalled({ id, file }),
            website: getLink({ id, file }),
            type,
            baseFir: file
          })
        )
    }

    isInstalled ({ id, file }) {
        const resolvedPath = getPath({ id, file })
        return resolvedPath && fs.existsSync(resolvedPath)
    }

    getPath ({ id, file }) {
        const filePath = resolveModule(path.join(id, 'package.json'), file)
        if (!filePath) return
        return resolveModuleRoot(filePath, id)
    }

    getLink ({ id, file }, context) {
        const pkg = readPackage({ id, file })
        return pkg.homepage ||
          (pkg.repository && pkg.repository.url) ||
          `https://www.npmjs.com/package/${id.replace('/', '%2F')}`
    }

    readPackage ({ id, file }) {
        try {
          return folders.readPackage(getPath({ id, file }))
        } catch (e) {
          console.log(e)
        }
        return {}
    }

}

module.exports = DependenciesApi