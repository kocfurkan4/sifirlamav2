const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const User = require('../models/User.model');

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('weapons');

    if (!user) {
      return res.status(404).json({
        error: 'Kullanıcı bulunamadı'
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: 'Sunucu hatası',
      message: error.message
    });
  }
});

// Update user profile
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const { rank, unit } = req.body;

    const updates = {};
    if (rank) updates.rank = rank;
    if (unit !== undefined) updates.unit = unit;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        error: 'Kullanıcı bulunamadı'
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: 'Güncelleme hatası',
      message: error.message
    });
  }
});

module.exports = router;
