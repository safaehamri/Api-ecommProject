// src/models/Order.js
// Brief: Mongoose model for orders, linking users and products.
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, default: 'pending' },
  placedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
