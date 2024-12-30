// src/middleware/errorHandler.js
// Brief: Centralized error handling middleware that captures exceptions and returns standardized responses.
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    msg: err.message || 'Server Error'
  });
};
