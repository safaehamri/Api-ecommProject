// src/models/Product.js
// Brief: Mongoose model for products, storing e-commerce product details.
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  price: { type: Number, required: true },
  oldPrice: Number,
  rating: { type: Number, default: 0 },
  category: { type: String, required: true },
  description: String,
  dateAdded: { type: Date, default: Date.now },
  sales: { type: Number, default: 0 },
  images: [String],
  colors: [String],
  offerExpiry: Date,
  stockQuantity: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  additionalInfo: [String]
});

module.exports = mongoose.model('Product', productSchema);
