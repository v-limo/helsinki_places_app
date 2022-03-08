const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    userName: { type: 'String' },
    name: { type: 'String' },
    email: { type: 'String', required: true, unique: true },
    picture: { type: 'String' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
