const execa = require('execa')

// npm scripts
function runScripts (name, pathProject) {
  return execa.command(
    `npm --prefix ${pathProject} ${name}`,
    { shell: true }
  )
}
 
module.exports = {
  runScripts
}
