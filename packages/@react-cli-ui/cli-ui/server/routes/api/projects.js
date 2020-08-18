const { Router } = require('express')
const fs = require('fs')
const router = Router()
// db
const { db, dbPath } = require('../../util/db')

const { craNpm, craYarn } = require('../../util/create')

// Get list project
router.get('/', (req, res) => {
  req.log.info('GET project')
  if (fs.existsSync(dbPath)) {
    res.status(200).json({
      data: db.get('projects').value()
    })
  } else {
    res.status(500).json({
      message: 'Что-то пошло не так, попробуйте снова'
    })
  }
})

// Create new project
router.post('/create', async (req, res) => {
  const {
    name,
    path: pathProject,
    manager = '',
    preset = ''
  } = req.body

  req.setTimeout(0)

  let subprocess
  if (manager === 'npm') {
    subprocess = craNpm(pathProject, name)
  } else {
    subprocess = craYarn(pathProject, name)
  }
  subprocess.stdout.pipe(process.stdout)
  try {
    req.log.info('POST project/create')
    const { stdout } = await subprocess
    // add db project
    if (stdout) {
      db.get('projects').push({
        id: db.get('projects').value().length + 1,
        name,
        path: pathProject,
        manager,
        preset
      }).write()
    }

    res.status(200).json({
      message: 'Project successfully create'
    })
  } catch (error) {
    req.log.error('POST error project/create')
    res.status(500).json({
      message: 'Что-то пошло не так, попробуйте снова'
    })
  }
})

// Get project by Id
router.get('/:id', (req, res) => {
  req.log.info('GET project/:id')
  const id = parseInt(req.params.id)
  res.status(200).send({
    data: db.get('projects')
      .filter({ id })
      .value()
  })
})

// Delete project by Id
router.delete('/:id', (req, res) => {
  req.log.info('DELETE project/:id')
  const id = parseInt(req.params.id)
  console.log(id)
  if (id) {
    db.get('projects')
      .remove({ id })
      .write()
    res.status(200).json({
      data: db.get('projects').value()
    })
  } else {
    res.status(200).json({
      data: db.get('projects').value()
    })
  }
})

// Clear db
router.post('/clear', (req, res) => {
  req.log.info('Clear list projects')
  db.get('projects')
    .remove().write()
  res.status(200).json({
    data: db.get('projects').value()
  })
})

module.exports = router
