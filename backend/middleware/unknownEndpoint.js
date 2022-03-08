const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: 'unknown endpoint' })
  next()
}
 
module.exports = { unknownEndpoint }
