const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Middleware para habilitar CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router.get('/', (req, res) => {
    res.send('Server is running');
  });

module.exports = router; 