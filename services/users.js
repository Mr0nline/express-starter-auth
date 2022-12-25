const UserModel = require('../models/user')

const createUser = async (data) => {
  console.log('😊 -> createUser -> data', data)
  const { username, password } = data
  const newUser = new UserModel({ username, password })
  await newUser.save()
  //   db.users.insertOne({ username, password })

  return newUser
}

const getUser = async (userId) => {
  console.log('😊 -> getUser -> userId', userId)
  return await UserModel.findOne({ _id: userId })
}

const updateUser = async (userId, data) => {
  console.log('😊 -> updateUser -> userId, data', userId, data)
  const existingUser = await UserModel.findOne({ _id: userId })
  const { username, password } = data
  existingUser.username = username
  existingUser.password = password
  await existingUser.save()

  return existingUser
  //   db.findOneAndUpdate({ _id: userId }, { $set: { username, password } })
}

module.exports = { createUser, getUser, updateUser }
