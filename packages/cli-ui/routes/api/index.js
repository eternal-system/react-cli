const router = require('express').Router()

router.use('/folders', require('./folders'))
router.use('/projects', require('./projects'))
router.use('/kill', require('./kill'))

module.exports = router
