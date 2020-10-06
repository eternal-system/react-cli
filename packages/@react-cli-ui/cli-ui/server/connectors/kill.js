class KillApi {
  constructor (client, db, logs) {
    this.client = client
    this.db = db
    this.logs = logs
  }

  /**
   * Kill port
   * @param {number} port port
   */
  port (port) {
    if (port === 'undefined' || port === '') {
      this.client.emit('kill-erro', {
        title: '❌ Has\'t port to kill',
        message: 'Couldn\'t kill process'
      })
    } else {
      require('child_process').exec(`kill -9 $(lsof -t -i:${port} -sTCP:LISTEN)`, (err) => {
        if (err) {
          console.log('err', err)
          this.client.emit('kill-erro', {
            title: `❌ Port: ${port}`,
            message: 'Couldn\'t kill process'
          })
          this.logs.add({
            message: 'Couldn\'t kill process',
            type: 'info'
          })
        } else {
          this.client.emit('kill-port', {
            title: `🌠 Port: ${port}`,
            message: 'Successfully killed'
          })
          this.logs.add({
            message: 'Successfully killed',
            type: 'info'
          })
        }
      })
    }
  }
}

module.exports = KillApi
