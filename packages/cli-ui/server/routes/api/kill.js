const { Router } = require('express')
// const fkill = require('fkill')
const router = Router()

router.get('/', (req, res) => {
  const port = req.query.port
  console.log('port', port, typeof port)
  if (port === 'undefined' || port === '') {
    return res.status(400).json({
      title: '❌ Has\'t port to kill',
      message: 'Couldn\'t kill process'
    })
  } else {
    require('child_process').exec(`kill -9 $(lsof -t -i:${port} -sTCP:LISTEN)`, (err) => {
      if (err) {
        console.log('err', err)
        return res.status(400).json({
          title: `❌ Port: ${port}`,
          message: 'Couldn\'t kill process'
        })
      }
      return res.status(200).json({
        title: `🌠 Port: ${port}`,
        message: 'Successfully killed'
      })
    })
  }
})

module.exports = router
