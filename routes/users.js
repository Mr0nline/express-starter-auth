const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { createUser, getUser, updateUser } = require('../services/users')

const getUserData = async (req, res, next) => {
  const user = await getUser(req.params.id)
  const token = await jwt.sign(
    { password: user.password },
    process.env.JWT_SECRET
  )
  res.send({ user, token })
}
const createUserData = async (req, res, next) => {
  const user = await createUser(req.body)
  res.send(user)
}
const updateUserData = async (req, res, next) => {
  const user = await updateUser(req.params.id, req.body)
  res.send(user)
}

const verifyLogin = async (req, res, next) => {
  const { token } = req.body
  jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(401).send('Youre unauthorized')
    }

    console.log({ data })
    next()
  })
}

const getUserPassword = async (req, res, next) => {
  const user = await getUser(req.params.id)
  res.send(user.password)
}

// localhost:3000/users
router.get('/get-password/:id', verifyLogin, getUserPassword)
router.get('/:id', getUserData)
router.post('/', createUserData)
router.put('/:id', updateUserData)

module.exports = router
