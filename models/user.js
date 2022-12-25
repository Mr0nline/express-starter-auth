const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
})

userSchema.index('username')

const UserModel = new model('user', userSchema)

module.exports = UserModel
