// src/middleware/adminAuth.js
// Brief: Ensures user is admin before allowing access to admin endpoints.
module.exports = (req, res, next) => {
    if(!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Admin privileges required' });
    }
    next();
  };
  