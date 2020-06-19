const router = require('express').Router()

router.use('/folders', require('./folders'))
router.use('/projects', require('./projects'))

module.exports = router
