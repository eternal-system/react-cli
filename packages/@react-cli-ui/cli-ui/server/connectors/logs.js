const { v4: uuid } = require('uuid')
/** @typedef {'warn' | 'error' | 'info' | 'done'} LogType */

/**
 * @typedef Log
 * @prop {string} id
 * @prop {string} date
 * @prop {LogType} type
 * @prop {string} tag
 * @prop {string} message
 */

class LogsApi {
  constructor (client, db) {
    this.client = client
    this.db = db
  }

  /**
   * @param {Log} log
   * @param {any} context
   */
  add (log) {
    /** @type {Log} */
    const item = {
      id: uuid(),
      date: new Date().toISOString(),
      tag: null,
      ...log
    }
    this.db.get('logs').push(item).write()
    this.client.emit('list-logs', {
      data: this.db.get('logs').value()
    })
  }

  list () {
    this.client.emit('list-logs', {
      data: this.db.get('logs').value()
    })
  }

  last () {
    if (this.db.get('logs').velue().length) {
      this.client.emit('list-logs', {
        data: this.db.get('logs')
          .find({ id: this.db.get('logs').value()[this.db.get('logs') - 1] })
          .value()
      })
    }
    return null
  }

  clear () {
    this.client.emit('list-logs', {
      data: this.db.set('logs', []).write()
    })
  }
}

module.exports = LogsApi
