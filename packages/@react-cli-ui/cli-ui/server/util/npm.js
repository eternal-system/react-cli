const execa = require('execa')

// npm install  
function npmInstall (name, pathProject, dep) {
  return execa.command(
    `npm --prefix ${pathProject} install ${name} ${dep === 'devDependencies' ? '--save-dev' : ''}`,
    { shell: true }
  )
}

// npm uninstall
function npmUninstall (name, pathProject) {
  return execa.command(
    `npm --prefix ${pathProject} uninstall ${name}`,
    { shell: true }
  )
}

module.exports = {
  npmInstall,
  npmUninstall
}
