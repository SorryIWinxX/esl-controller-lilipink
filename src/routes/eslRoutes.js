const express = require('express');
const router = express.Router();
const eslController = require('../controllers/ESLController');

// Middleware para habilitar CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// ESL routes
router.get('/', (req, res) => eslController.getAll(req, res));
router.delete('/', (req, res) => eslController.deleteAll(req, res));

module.exports = router;
