const execa = require('execa')

// npm scripts
function runScripts (name, pathProject) {
  return execa.command(
    `npm --prefix ${pathProject} ${name}`,
    { shell: true }
  )
}

// run console comand
function runConsoleComand (comand) {
  return execa.command(comand, { shell: true })
}

module.exports = {
  runScripts,
  runConsoleComand
}
