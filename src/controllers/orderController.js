// src/controllers/orderController.js
// Brief: Manages user orders. Minimal logic for demonstration.
// In production, implement full CRUD, validation, and business logic.
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.placeOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');
    if(!user) return res.status(404).json({ msg: 'User not found' });
    if(user.cart.length === 0) return res.status(400).json({ msg: 'Cart is empty' });

    let total = 0;
    for(const item of user.cart) {
      if(item.productId.stockQuantity < item.quantity) {
        return res.status(400).json({ msg: 'Insufficient stock for some items' });
      }
      total += (item.productId.price * item.quantity);
    }

    // Deduct stock
    for(const item of user.cart) {
      const product = await Product.findById(item.productId._id);
      product.stockQuantity -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: user._id,
      items: user.cart.map(ci => ({
        product: ci.productId._id,
        quantity: ci.quantity,
        price: ci.productId.price
      })),
      total
    });
    await order.save();

    user.orders.push(order._id);
    user.cart = [];
    await user.save();

    res.json({ msg: 'Order placed successfully', order });
  } catch(err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch(err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate('items.product');
    if(!order) return res.status(404).json({ msg: 'Order not found' });
    res.json(order);
  } catch(err) {
    next(err);
  }
};
