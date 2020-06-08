#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');
const ui = require('../lib/ui');
const chalk = require('chalk');

program
    .version(`@react/cli ${require('../package').version}`)
    .usage('<command> [options]')

program
    .command('ui')
    .description('start and open the react-cli ui')
    .action((cmd) => {
        ui();
    })
program
    .command('info')
    .description('print debugging information about your environment')
    .action((cmd) => {
        console.log('info');
    })


program.on('--help', () => {
    console.log(`  Run ${chalk.cyan(`react <command> --help`)} for detailed usage of given command.`)
})

program.parse(process.argv);