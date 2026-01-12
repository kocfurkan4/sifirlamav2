const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        error: 'Yetkilendirme hatası',
        message: 'Token bulunamadı'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');

    // Find user
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        error: 'Yetkilendirme hatası',
        message: 'Kullanıcı bulunamadı'
      });
    }

    // Attach user to request
    req.user = user;
    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Yetkilendirme hatası',
        message: 'Geçersiz token'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Yetkilendirme hatası',
        message: 'Token süresi dolmuş'
      });
    }

    res.status(500).json({
      error: 'Sunucu hatası',
      message: error.message
    });
  }
};

module.exports = authMiddleware;
