const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { OAuth2Client } = require('google-auth-library')

const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
  let { email, password, username } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Please add all required credentials')
  }

  const userExiest = await User.findOne({ email })
  if (userExiest) {
    res.status(400)
    throw new Error('User already exists')
  }

  if (!username) {
    username = req.body.email
  }

  let salt = await bcrypt.genSaltSync(10)
  let hashPassword = await bcrypt.hash(password, salt)
  const createdUser = await User.create({
    email: email.toLowerCase(),
    username,
    password: hashPassword,
  })

  if (createdUser) {
    res
      .status(201)

      .json({
        _id: createdUser._id,
        username: createdUser.username,
        email,
        token: generateToken(createdUser._id, email),
      })
  } else {
    res.status(400).json('invalid email or password')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: email.toLowerCase(),
      token: generateToken(user._id, email),
    })
  } else {
    res.status(400).json('Unauthenticated')
  }
})

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

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

    if (!user) {
      const createdUser = await User.create({
        email: payload?.email,
        username: payload?.email,
      })
      res.status(201).json({
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
        token: generateToken(createdUser._id, createdUser.email),
      })
    } else {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user?.email,
        token: generateToken(user._id, user.email),
      })
    }
  } else {
    res.status(400).json('Unauthenticated - No token')
  }
})

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '1d' })
}
module.exports = { getUser, registerUser, loginUser, googleLogin }
