// src/controllers/adminController.js
// Brief: Handles admin actions. Minimal logic for demonstration.
// In production, implement full CRUD, validation, and business logic.
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch(err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });
    if(role) user.role = role;
    await user.save();
    res.json({ msg: 'User updated', user });
  } catch(err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });
    res.json({ msg: 'User deleted' });
  } catch(err) {
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json({ msg: 'Product added', product });
  } catch(err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!product) return res.status(404).json({ msg: 'Product not found' });
    res.json({ msg: 'Product updated', product });
  } catch(err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product) return res.status(404).json({ msg: 'Product not found' });
    res.json({ msg: 'Product deleted' });
  } catch(err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('items.product user');
    res.json(orders);
  } catch(err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).json({ msg: 'Order not found' });
    order.status = status;
    await order.save();
    res.json({ msg: 'Order status updated', order });
  } catch(err) {
    next(err);
  }
};
