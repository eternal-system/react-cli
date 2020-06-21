const { Router } = require('express')
const fkill = require('fkill')
const router = Router()

router.get('/', async (req, res) => {
  const port = req.query.port
  console.log('port', port, typeof port)
  if (port === 'undefined') {
    res.send('note')
  } else if (port === '') {
    res.send('note')
  } else {
    try {
      await fkill(`:${port}`)
      // res.send(kill)
      res.send(`🌠 Port :${port} successfully killed`)
    } catch (error) {
    // res.send(error)
      console.log(error)
      res.send(error)
    }
  }
})

module.exports = router
