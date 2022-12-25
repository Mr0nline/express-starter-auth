const mongoose = require('mongoose')

const connectToDB = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGO_URL, (error) => {
      if (error) {
        console.log('Mongo Connection Error', error)
        reject(error)
      }
      console.log('Connected to MongoDB..')
      resolve()
    })
  })
}

module.exports = { connectToDB }
