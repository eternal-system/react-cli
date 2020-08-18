const execa = require('execa')
const path = require('path')

// install npm create-react-app
function craNpm (pathProject, name) {
  return execa.command(
    `npx create-react-app ${path.join('/', ...pathProject, name)} --use-npm`,
    { shell: true }
  )
}

// install yarn create-react-app
function craYarn (pathProject, name) {
  return execa.command(
    `yarn create react-app ${path.join('/', ...pathProject, name)}`,
    { shell: true }
  )
}

module.exports = {
  craYarn,
  craNpm
}
