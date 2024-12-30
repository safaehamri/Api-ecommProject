// src/routes/userRoutes.js
// Brief: User routes for viewing and updating profile.
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getProfile, updateProfile } = require('../controllers/userController');

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;
