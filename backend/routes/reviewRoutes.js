const express = require('express')
const router = express.Router()
const {
  getAllReviews,
  setReview,
  deleteReview,
  updateReview,
} = require('../controller/reviewController')
const protect = require('../middleware/authMiddleware')

router.get('/', getAllReviews).post('/', protect, setReview)

router.put('/:id', protect, updateReview).delete('/:id', protect, deleteReview)

module.exports = router
