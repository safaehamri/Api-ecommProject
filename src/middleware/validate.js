// src/middleware/validate.js
// Brief: Validates request data using express-validator. If invalid, returns errors.
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
