// src/routes/orderRoutes.js
// Brief: Order routes for placing and viewing user orders.
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { placeOrder, getOrders, getOrderById } = require('../controllers/orderController');

router.post('/', auth, placeOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);

module.exports = router;
