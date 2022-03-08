const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')

const { googleLogin } = require('../controller/userController')
router.post('/google-login', googleLogin)

module.exports = router
