import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const PORT = 3001



// const controller = require('./controller.js')

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

///  ROUTES
// home
app.get('/', (_req, res) => res.send('<h1>Welcome homepage</h1>'))

// LISTEN
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
