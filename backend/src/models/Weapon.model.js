const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Silah adı gereklidir'],
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Tüfek', 'Tabanca', 'Makineli Tüfek', 'Keskin Nişancı', 'Diğer']
  },
  caliber: {
    type: String,
    required: true,
    trim: true
  },
  serialNumber: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  specifications: {
    barrelLength: Number,
    weight: Number,
    effectiveRange: Number
  },
  lastZeroing: {
    type: Date
  },
  zeroingHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShootingSession'
  }],
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Weapon', weaponSchema);
