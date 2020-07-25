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
      return res.status(200).json({
        title: `🌠 Port: ${port}`,
        message: 'Successfully killed'
      })
    } catch (error) {
      return res.status(400).json({
        title: `❌ Port: ${port}`,
        message: 'Couldn\'t kill process'
      })
    }
  }
})

module.exports = router
