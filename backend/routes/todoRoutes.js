const express = require('express')
const router = express.Router()
const {
  getTodo,
  setTodo,
  deleteTodo,
  updateTodo,
} = require('../controller/todoController')
const protect = require('../middleware/authMiddleware')

router.get('/', protect, getTodo).post('/', protect, setTodo)

router.put('/:id', protect, updateTodo).delete('/:id', protect, deleteTodo)

module.exports = router
