// src/utils/tokenHelper.js
// Brief: Helper functions for JWT token creation and verification.
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

exports.signToken = (payload) => jwt.sign(payload, keys.JWT_SECRET, { expiresIn: '1h' });

exports.verifyToken = (token) => jwt.verify(token, keys.JWT_SECRET);
