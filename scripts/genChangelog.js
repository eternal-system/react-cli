const fs = require('fs')
const path = require('path')
const execa = require('execa')

async function genNewRelease () {
  const nextVersion = require('../lerna.json').version
  console.log("nextVersion =", nextVersion)
  const data = await execa(require.resolve('lerna-changelog/bin/cli'), [
    '--next-version',
    nextVersion
  ])
  console.log("stdout =", data)
  return data.stdout
}

const gen = (module.exports = async () => {
  const newRelease = await genNewRelease()
  const changelogPath = path.resolve(__dirname, '../CHANGELOG.md')

  const newChangelog =
    newRelease + '\n\n\n' + fs.readFileSync(changelogPath, { encoding: 'utf8' })
  fs.writeFileSync(changelogPath, newChangelog)

  delete process.env.PREFIX
})

if (require.main === module) {
  gen().catch(err => {
    console.error(err)
    process.exit(1)
  })
}