// src/controllers/wishlistController.js
// Brief: Manages user wishlist. Minimal logic for demonstration.
// In production, implement full CRUD, validation, and business logic.
const User = require('../models/User');

exports.getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('wishlist');
    if(!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user.wishlist);
  } catch(err) {
    next(err);
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });

    if(!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.json({ msg: 'Product added to wishlist', wishlist: user.wishlist });
  } catch(err) {
    next(err);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });

    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.itemId);
    await user.save();
    res.json({ msg: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch(err) {
    next(err);
  }
};
