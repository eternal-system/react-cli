const { Router } = require('express')
const fs = require('fs')
const path = require('path')
const router = Router()
// db
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const folderDbPath = path.normalize(__dirname + '../../../../db.json')
const adapter = new FileSync(folderDbPath)
const db = low(adapter)

const { exec, spawn } = require('child_process')

const execa = require('execa')
const shell = require('shelljs')

// const timeout = require('connect-timeout')

// scripts
const craNpm = (pathProject, name) => execa.command(`npx create-react-app ${path.join('/', ...pathProject, name)} --use-npm`, {shell: true})
const craYarn = (pathProject, name) => execa.command(`yarn create react-app ${path.join('/', ...pathProject, name)}`, {shell: true})



const createReactApp = (pathProject, name) => {
  return new Promise(resolve=>{
    if(name){
      shell.exec(`create-react-app ${path.join('/', ...pathProject, name)}`, () => {
        console.log("Created react app")
        resolve(true)
      })
    }else{
      console.log("\nNo app name was provided.".red)
      console.log("\nProvide an app name in the following format: ")
      console.log("\ncreate-react-redux-router-app ", "app-name\n".cyan)
        resolve(false)
    }
  })
}

function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
   exec(cmd, (error, stdout, stderr) => {
    if (error) {
     console.warn(error);
    }
    resolve(stdout? stdout : stderr);
   });
  });
 }

// Get list project
router.get('/', (req, res) => {
  if (fs.existsSync(folderDbPath)) {
    res.send(db.get('projects').value())
  } else {
    console.log('dont find db')
  }
})

function setTimeoutPromise(delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  });
}

// Create new project
router.post('/create', async (req, res, next) => {
  const { 
    name, 
    path: pathProject, 
    manager = '', 
    preset = ''
  } = req.body

  try {
    // await setTimeoutPromise(110000)
   // await setTimeoutPromise(180000)
   await setTimeoutPromise(3000)
    return res.status(200).json({ 
      message: 'Project successfully create'
    })
  } catch (error) {
    return res.status(500).json({ 
      message: 'Что-то пошло не так, попробуйте снова'
    })
  }

  //res.connection.setTimeout(180000)
//  res.server.timeout = 180000

  // res.setHeader('Expires', '-1')
  // res.setHeader('Pragma', 'no-cache')

  // req.setTimeout(340000);
 
  // const child = spawn(`create-react-app ${path.join('/', ...pathProject, name)}`);
  //const child = spawn('create-react-app', [path.join('/', ...pathProject, name)]);
  // console.log('child', child)
  
 

  // process.on('data', (data) => {
  //   console.log('data process =', data)
  // })

  // process.on('close', (data) => {
  //   console.log('close process =', data)
  // })

  // console.log('324535345345345', process.stdout.pipe(child.stdout))
  // process.stdout.pipe(process.child)
  // process.stderr.pipe(process.child)



  // child.stdout.on('data', (data) => {
  //   console.log(`child stdout:\n${data}`);
  // });

  // child.stderr.on('data', (data) => {

  //   console.log(`child stderr: ${data}`);
  // });

  // child.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);

  // });

  // child.on('exit', function (code, signal) {
  //   console.log('child process exited with ' +
  //               `code ${code} and signal ${signal}`);

  // });

  // try {
  //   // res.timeout = 180000
  //   console.log('create react appp', res)
    
  //   //res.setTimeout(0) // no timeout
  //    let success = await createReactApp(pathProject, name)
  //   console.log('success', success)
   
  //   res.send('Project successfully create')
  //   res.end()
  // } catch (error) {
  //   console.log(error)
  //   return res.status(500).json({ 
  //     message: 'Что-то пошло не так, попробуйте снова'
  //   })
  // }
 

 
  // if(!success) {
  //  return false
  // }

  // if(success) {
  //   res.send('Project successfully create')
  //   // return res.status(200).json({
  //   //   message: 'Project successfully create'
  //   // })
  // } else {
  //   return res.status(500).json({ 
  //     message: 'Что-то пошло не так, попробуйте снова'
  //   })
  // }
 
})

function haltOnTimedout (req, res, next) {
  console.log(2342343242343, req.timedout)
  if (!req.timedout) next()
}

// Get project by Id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  res.send(
    db.get('projects')
      .filter({ id })
      .value()
  )
})

// Delete project by Id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id)
  console.log(id)
  if (id) {
    db.get('projects')
      .remove({ id })
      .write()
    res.send(db.get('projects').value())
  } else {
    res.send(db.get('projects').value())
  }
})

// Clear DB
router.post('/clear', (req, res) => {
  db.get('projects')
    .remove().write()
  res.send(db.get('projects').value())
})

module.exports = router
