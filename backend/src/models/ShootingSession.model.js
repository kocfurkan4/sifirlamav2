const mongoose = require('mongoose');

const shotSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  distance: Number,
  timestamp: { type: Date, default: Date.now }
});

const shootingSessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  weapon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weapon',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  distance: {
    type: Number,
    required: [true, 'Mesafe bilgisi gereklidir'],
    min: 0
  },
  shots: [shotSchema],
  targetImage: {
    type: String
  },
  weatherConditions: {
    temperature: Number,
    windSpeed: Number,
    windDirection: String,
    humidity: Number
  },
  analysis: {
    groupSize: Number,
    averageX: Number,
    averageY: Number,
    standardDeviation: Number,
    clickAdjustments: {
      horizontal: Number,
      vertical: Number
    }
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Calculate analysis after shots are added
shootingSessionSchema.methods.calculateAnalysis = function() {
  if (this.shots.length === 0) return;

  const avgX = this.shots.reduce((sum, shot) => sum + shot.x, 0) / this.shots.length;
  const avgY = this.shots.reduce((sum, shot) => sum + shot.y, 0) / this.shots.length;

  const variance = this.shots.reduce((sum, shot) => {
    return sum + Math.pow(shot.x - avgX, 2) + Math.pow(shot.y - avgY, 2);
  }, 0) / this.shots.length;

  const stdDev = Math.sqrt(variance);

  this.analysis = {
    averageX: avgX,
    averageY: avgY,
    standardDeviation: stdDev,
    groupSize: Math.max(...this.shots.map(s =>
      Math.sqrt(Math.pow(s.x - avgX, 2) + Math.pow(s.y - avgY, 2))
    )) * 2,
    clickAdjustments: {
      horizontal: Math.round(avgX * 4),
      vertical: Math.round(avgY * 4)
    }
  };
};

module.exports = mongoose.model('ShootingSession', shootingSessionSchema);
