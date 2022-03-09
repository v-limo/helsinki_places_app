const asyncHandler = require('express-async-handler')
const Review = require('../models/reviewModel')
const User = require('../models/userModel')

const getAllReviews = asyncHandler(async (req, res) => {
  const Reviews = await Review.find({})
  res.status(200).json(Reviews)
})

const setReview = asyncHandler(async (req, res) => {
  const { rate, place, message } = req.body
  console.log(req.body)
  if (!rate || !place || !message) {
    res.status(400)
    throw new Error('Please add data')
  }

  const createdReview = await Review.create({
    rate,
    place,
    message,
    user: req.user.id,
  })
  res.status(200).json(createdReview)
})

const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)
  if (!review) {
    res.status(400)
    throw new Error('Review not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('Not authorized - Not the owner')
  }

  if (review.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )
  res.status(200).json(updatedReview)
})

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)

  if (!review) {
    res.status(400)
    throw new Error('Review not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('Not authorized - User not found')
  }

  if (review.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }
  await Review.remove()
  res.status(200).json({ message: 'Deleted success!', id: req.params.id })
})

module.exports = { getAllReviews, setReview, deleteReview, updateReview }
