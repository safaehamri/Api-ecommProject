// src/app.js
// Brief: Initializes Express app, loads middleware, routes, and error handling.
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Security & Common Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Database Connection
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
