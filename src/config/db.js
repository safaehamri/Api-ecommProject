// src/config/db.js
// Brief: Establishes database connection using Mongoose.
const mongoose = require('mongoose');
const keys = require('./keys');

exports.connectDB = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
