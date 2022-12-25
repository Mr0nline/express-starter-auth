require('dotenv').config()
const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/users')
const { connectToDB } = require('./db')

const app = express()
const port = process.env.PORT || 3000
console.log('😊 -> port', port)

const initializeServer = async () => {
  // Connect to DB
  await connectToDB()

  app.use(cors())
  app.use(express.json())
  app.use('/users', userRouter)

  // localhost:3000/
  app.get('/', (req, res, next) => {
    console.log('Request received')
    res.status(201).send('Hello, World!')
  })

  app.use('*', (req, res) =>
    res.status(404).send("The path you're looking is not found...")
  )

  app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('Something unexpected happened...')
  })

  app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
  })
}

initializeServer()
