const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    place: {
      type: Number,
      required: true,
    },
    message: { type: 'String', required: true, unique: true },
    rate: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', ReviewSchema)
