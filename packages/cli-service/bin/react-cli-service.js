#!/usr/bin/env node
const execa = require('execa')

const rawArgv = process.argv.slice(2)
// console.log(rawArgv, __dirname)

async function cli (arg) {
  try {
    return await execa('react-cli-ui', [`${arg}`])
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// execa('react-cli-ui', [])
async function git (status) {
  return await execa('git', [`${status}`])
}

async function create (name) {
  const path = '/Users/vladkalachev/Desktop'
  const subprocess = execa.command(`create-react-app ${path}/${name}`)
  subprocess.stdout.pipe(process.stdout)

  try {
    console.log('start process 1')
    const { stdout } = await subprocess
    console.log('child output:', stdout)
    return stdout
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

create(rawArgv[0])
