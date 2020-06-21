const { server } = require('../../cli-ui/server')
const { openBrowser } = require('./util/openBrowser')
const port = 8080

function ui (args = {}) {
  const host = args.host || 'localhost'
  console.log('ui arg', args)

  if (!args.quiet) console.log('🚀  Starting GUI...')

  // Config for server enveronment
  const config = {
    host,
    port
  }

  // start server
  server(config, () => {
    // Open browser
    const url = `http://${host}:${port}`
    if (!args.quiet) console.log(`🌠  Ready on ${url}`)

    if (args.headless) {
      console.log(port)
    } else {
      openBrowser(url)
    }
  })
}

module.exports = ui
