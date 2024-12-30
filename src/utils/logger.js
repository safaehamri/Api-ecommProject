// src/utils/logger.js
// Brief: Sets up logging (can integrate morgan, Winston, or other logging frameworks).
const morgan = require('morgan');

module.exports = morgan('tiny');
