// src/controllers/userController.js
// Brief: Handles user profile viewing, updates.
const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if(!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch(err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, address } = req.body; 
    const user = await User.findById(req.user.id);
    if(!user) return res.status(404).json({ msg: 'User not found' });
    if(name) user.profile.name = name;
    if(address) user.profile.address = address;
    await user.save();
    res.json({ msg: 'Profile updated', profile: user.profile });
  } catch(err) {
    next(err);
  }
};
