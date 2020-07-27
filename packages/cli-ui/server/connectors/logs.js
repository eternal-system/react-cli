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

  /** @type {Log []} */
  this.logs = []

  constructor (client, db) {
    this.client = client
    this.context = db
  }

  /**
   * @param {Log} log
   * @param {any} context
   */
  add (log) {
    /** @type {Log} */
    const item = {
      id: this.logs.length + 1,
      date: new Date().toISOString(),
      tag: null,
      ...log
    }
    this.client.emit('log', {
      data: this.logs.push(item)
    })
  }

  list () {
    this.client.emit('log', {
      data: this.logs
    })
  }

  last () {
    if (this.logs.length) {
      this.client.emit('log', {
        data: this.logs[this.logs.length - 1]
      })
    }
    return null
  }

  clear() {
    this.logs = []
    this.client.emit('log', {
      data: this.logs
    })
  }

}
