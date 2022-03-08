const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
      req.user = await User.findById(decodedToken.id).select('-password')
      req.token = token
      next()
    } catch (error) {
      console.log(error.message)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
  if (!token) {
    res.status(401)
    next()
    throw new Error('Not authorized, No token provided')
  }
})

module.exports = protect
