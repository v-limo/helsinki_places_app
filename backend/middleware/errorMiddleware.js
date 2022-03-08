const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)

  res.json({ message: error.message })
  next()
}

module.exports = {
  errorHandler,
}
