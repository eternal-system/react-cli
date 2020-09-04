#!/usr/bin/env node

const program = require('commander')
const pack = require('../package')
const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node

function checkNode (wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
        ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

checkNode(requiredVersion, '@react-cli-ui/cli')

program
  .version(`@react-cli-ui/cli ${pack.version}`)
  .usage('<command> [options]')

program
  .command('kill [port]')
  .description('kill port')
  .action((port, cmd) => {
    require('../lib/kill')(port, cleanArgs(cmd))
  })

program
  .command('ui')
  .description('start and open the react-cli ui')
  .option('-D, --dev', 'Run in dev mode')
  .option('--headless', 'Don\'t open browser on start and output port')
  .action((cmd) => {
    checkNode('>=8.6', 'react ui')
    require('../lib/ui')(cleanArgs(cmd))
  })

program
  .command('info')
  .description('print debugging information about your environment')
  .action(() => {
    console.log(chalk.bold('\nEnvironment Info:'))
    require('envinfo').run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'Yarn', 'npm'],
        Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
        npmPackages: '/**/{typescript,*/}',
        npmGlobalPackages: ['@react-cli-ui/cli']
      },
      {
        showNotFound: true,
        duplicates: true,
        fullTree: true
      }
    ).then(console.log)
  })

program.on('--help', () => {
  console.log(`Run ${chalk.cyan('react <command> --help')} for detailed usage of given command.`)
})

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log('  ' + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  })

program.parse(process.argv)

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// Clean args function in node modules
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
