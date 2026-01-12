const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'default_secret_key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, rank, unit } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Eksik bilgi',
        message: 'Kullanıcı adı, email ve şifre gereklidir'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'Kullanıcı mevcut',
        message: 'Bu email veya kullanıcı adı zaten kullanılıyor'
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      rank: rank || 'Er',
      unit: unit || ''
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Kayıt başarılı',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        rank: user.rank,
        unit: user.unit
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      error: 'Kayıt hatası',
      message: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        error: 'Eksik bilgi',
        message: 'Kullanıcı adı ve şifre gereklidir'
      });
    }

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        error: 'Giriş hatası',
        message: 'Kullanıcı adı veya şifre hatalı'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Giriş hatası',
        message: 'Kullanıcı adı veya şifre hatalı'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        rank: user.rank,
        unit: user.unit
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Giriş hatası',
      message: error.message
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('weapons');

    if (!user) {
      return res.status(404).json({
        error: 'Kullanıcı bulunamadı',
        message: 'Kullanıcı mevcut değil'
      });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: 'Sunucu hatası',
      message: error.message
    });
  }
};
