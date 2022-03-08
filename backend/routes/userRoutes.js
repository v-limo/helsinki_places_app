const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')

const {
  getUser,
  registerUser,
  loginUser,
  googleLogin,
} = require('../controller/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/google-login', googleLogin)
router.get('/', protect, getUser)

module.exports = router
