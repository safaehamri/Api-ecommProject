// src/controllers/authController.js
// Brief: Handles user registration, login, password resets, etc.
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');

exports.registerUser = async (req, res, next) => {
  try {
    const { email, password, name, address } = req.body;
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ email, password, profile: { name, address } });
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch(err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json({ msg: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, keys.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch(err) {
    next(err);
  }
};
