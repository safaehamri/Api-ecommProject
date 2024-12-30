// src/middleware/auth.js
// Brief: Verifies JWT from the Authorization header, attaches user info to req.
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) return res.status(401).json({ msg: 'No token provided' });

  jwt.verify(token, keys.JWT_SECRET, (err, decoded) => {
    if(err) return res.status(403).json({ msg: 'Invalid token' });
    req.user = decoded;
    next();
  });
};
