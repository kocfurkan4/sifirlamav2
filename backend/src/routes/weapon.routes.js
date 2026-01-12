const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const Weapon = require('../models/Weapon.model');
const User = require('../models/User.model');

// Get all weapons for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const weapons = await Weapon.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.json(weapons);
  } catch (error) {
    console.error('Get weapons error:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: error.message
    });
  }
});

// Get single weapon
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const weapon = await Weapon.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!weapon) {
      return res.status(404).json({
        error: 'Silah bulunamadı'
      });
    }

    res.json(weapon);
  } catch (error) {
    res.status(500).json({
      error: 'Sunucu hatası',
      message: error.message
    });
  }
});

// Create new weapon
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, type, caliber, serialNumber, specifications, notes } = req.body;

    if (!name || !type || !caliber) {
      return res.status(400).json({
        error: 'Eksik bilgi',
        message: 'Silah adı, tipi ve kalibre gereklidir'
      });
    }

    const weapon = new Weapon({
      user: req.userId,
      name,
      type,
      caliber,
      serialNumber,
      specifications,
      notes
    });

    await weapon.save();

    // Add weapon to user's weapons array
    await User.findByIdAndUpdate(req.userId, {
      $push: { weapons: weapon._id }
    });

    res.status(201).json(weapon);
  } catch (error) {
    console.error('Create weapon error:', error);
    res.status(500).json({
      error: 'Silah eklenemedi',
      message: error.message
    });
  }
});

// Update weapon
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, type, caliber, serialNumber, specifications, notes } = req.body;

    const weapon = await Weapon.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { name, type, caliber, serialNumber, specifications, notes },
      { new: true, runValidators: true }
    );

    if (!weapon) {
      return res.status(404).json({
        error: 'Silah bulunamadı'
      });
    }

    res.json(weapon);
  } catch (error) {
    res.status(500).json({
      error: 'Güncelleme hatası',
      message: error.message
    });
  }
});

// Delete weapon
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const weapon = await Weapon.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!weapon) {
      return res.status(404).json({
        error: 'Silah bulunamadı'
      });
    }

    // Remove weapon from user's weapons array
    await User.findByIdAndUpdate(req.userId, {
      $pull: { weapons: weapon._id }
    });

    res.json({ message: 'Silah silindi' });
  } catch (error) {
    res.status(500).json({
      error: 'Silme hatası',
      message: error.message
    });
  }
});

module.exports = router;
