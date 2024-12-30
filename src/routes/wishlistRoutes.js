// src/routes/wishlistRoutes.js
// Brief: Wishlist routes for viewing, adding, removing items.
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');

router.get('/', auth, getWishlist);
router.post('/', auth, addToWishlist);
router.delete('/:itemId', auth, removeFromWishlist);

module.exports = router;
