require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/silah-sifirlama-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB bağlantısı başarılı'))
.catch((err) => console.error('❌ MongoDB bağlantı hatası:', err));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Silah Sıfırlama API',
    version: '1.0.0',
    status: 'running'
  });
});

// API Routes (will be added)
// app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/weapons', require('./routes/weapon.routes'));
// app.use('/api/shooting', require('./routes/shooting.routes'));
// app.use('/api/analysis', require('./routes/analysis.routes'));
// app.use('/api/users', require('./routes/user.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Bir şeyler yanlış gitti!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  console.log(`📍 http://localhost:${PORT}`);
});
