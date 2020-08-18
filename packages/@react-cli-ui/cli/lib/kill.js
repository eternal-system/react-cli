const fkill = require('fkill')

async function kill (port, options) {
  try {
    await fkill(`:${port}`)
    console.log(`🌠 Port :${port} successfully killed`)
  } catch (error) {
    console.log(e)
  }
}

module.exports = kill
