const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: { type: 'String', required: true, unique: true },
    rate: { type: 'Number', required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', ReviewSchema)
