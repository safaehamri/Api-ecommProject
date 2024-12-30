// src/routes/authRoutes.js
// Brief: Authentication routes for registration, login.
const express = require('express');
const router = express.Router();
const { registerRules } = require('../utils/validationRules');
const validate = require('../middleware/validate');
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerRules, validate, registerUser);
router.post('/login', loginUser);

module.exports = router;
