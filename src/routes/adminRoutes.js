// src/routes/adminRoutes.js
// Brief: Admin routes for managing users, products, and orders.
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const {
  getAllUsers,
  updateUser,
  deleteUser,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/adminController');

router.get('/users', auth, adminAuth, getAllUsers);
router.put('/users/:id', auth, adminAuth, updateUser);
router.delete('/users/:id', auth, adminAuth, deleteUser);

router.post('/products', auth, adminAuth, addProduct);
router.put('/products/:id', auth, adminAuth, updateProduct);
router.delete('/products/:id', auth, adminAuth, deleteProduct);

router.get('/orders', auth, adminAuth, getAllOrders);
router.put('/orders/:id', auth, adminAuth, updateOrderStatus);

module.exports = router;
