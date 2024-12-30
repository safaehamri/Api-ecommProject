// src/utils/validationRules.js
// Brief: Centralized validation rules for incoming requests (example for registration).
const { body } = require('express-validator');

exports.registerRules = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars')
];
