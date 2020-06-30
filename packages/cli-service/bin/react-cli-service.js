#!/usr/bin/env node
const execa = require('execa')

const rawArgv = process.argv.slice(2)
console.log(rawArgv, __dirname)

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

function cliP (argv) {
    return new Promise((resolve, reject) => {
        const child = execa('react-cli-ui', argv)
        child.on('error', reject)
        child.on('exit', code => {
            if (code !== 0) {
                reject(`mochapack exited with code ${code}.`)
            } else {
                resolve()
            }
        })
    }
)}

// TODO 
// get call process status
async function create (name) {
    try {
        const path = '/Users/vladkalachev/Desktop'
        const res = await execa('create-react-app', [`${path}/${name}`])
        console.log(res)
        return res
      } catch (error) {
        console.error(error)
        process.exit(1)
      }
}

// git(rawArgv[0]).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.error(err)
// })

// try {
//   const res = cli(rawArgv[0])
//   console.log(res)
// } catch (error) {
//   console.error(error)
//   process.exit(1)
// }

// cli(rawArgv[0])
// cli(rawArgv[0])

create(rawArgv[0])