const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { googleLogin } = require('../controllers/oAuthcontroller');

router.post('/login',login);
router.post('/register',register);
router.post('/auth/google', googleLogin);

module.exports = router;