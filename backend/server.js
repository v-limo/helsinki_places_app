require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { unknownEndpoint } = require('./middleware/unknownEndpoint')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())

connectDB()

app.use('/api/v1/todos', require('./routes/todoRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'))

app.get('/', (req, res) => {
  res.json({ message: 'Health Check' })
})

app.use(errorHandler)
app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log('Express server listening on port', PORT)
})
