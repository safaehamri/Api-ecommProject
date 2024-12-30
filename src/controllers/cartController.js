// src/controllers/cartController.js
// Brief: Manages user cart. Minimal logic for demonstration.
// In production, implement full CRUD, validation, and business logic.
const User = require('../models/User');
const Product = require('../models/Product');

exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('cart.productId');
    if(!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user.cart);
  } catch(err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });

    const product = await Product.findById(productId);
    if(!product || !product.inStock || product.stockQuantity < quantity) {
      return res.status(400).json({ msg: 'Product not available in requested quantity' });
    }

    const cartItem = user.cart.find(item => item.productId.toString() === productId);
    if(cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }
    await user.save();
    res.json({ msg: 'Product added to cart', cart: user.cart });
  } catch(err) {
    next(err);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });

    const cartItem = user.cart.find(item => item._id.toString() === req.params.itemId);
    if(!cartItem) return res.status(404).json({ msg: 'Cart item not found' });

    const product = await Product.findById(cartItem.productId);
    if(!product || product.stockQuantity < quantity) {
      return res.status(400).json({ msg: 'Insufficient stock' });
    }

    cartItem.quantity = quantity;
    await user.save();
    res.json({ msg: 'Cart item updated', cart: user.cart });
  } catch(err) {
    next(err);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });

    user.cart = user.cart.filter(item => item._id.toString() !== req.params.itemId);
    await user.save();
    res.json({ msg: 'Cart item removed', cart: user.cart });
  } catch(err) {
    next(err);
  }
};
