const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const User = require('../models/userModel')

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

const googleLogin = asyncHandler(async (req, res) => {
  const { token } = req.body
  if (token) {
    const client = new OAuth2Client(process.env.CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    })
    const payload = ticket.getPayload()
    let user = await User.findOne({ email: payload?.email })

    if (payload && payload?.email && !user) {
      const createdUser = await User.create({
        email: payload?.email,
        userName: payload?.given_name,
        name: payload?.name,
        picture: payload.picture,
      })

      res.status(201).json({
        _id: createdUser._id,
        name: createdUser.name,
        picture: createdUser.picture,
        email: createdUser.email,
        token: generateToken(createdUser._id, createdUser.email),
      })
    } else {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user?.email,
        name: user?.name,
        picture: user.picture,
        token: generateToken(user._id, user.email),
      })
    }
  } else {
    res.status(400).json('Unauthenticated - No token')
  }
})

module.exports = { googleLogin }
