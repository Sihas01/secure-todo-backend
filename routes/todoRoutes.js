const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { getTodos, createTodo } = require('../controllers/todoController');

router.get('/', verifyToken, getTodos);
router.post('/', verifyToken, createTodo);

module.exports = router;
