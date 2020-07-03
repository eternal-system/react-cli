#!/usr/bin/env node
const execa = require('execa')

const rawArgv = process.argv.slice(2)

async function create (name, path = '/Users/vladkalachev/Desktop') {
  const subprocess = execa.command(`create-react-app ${path}/${name}`)
  subprocess.stdout.pipe(process.stdout)
  try {
    const { stdout } = await subprocess
    return stdout
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = create(rawArgv[0], rawArgv[1])
