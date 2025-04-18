const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const { verifyToken } = require('../middleware/authMiddleware');

// Middleware para habilitar CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Ruta para home protegida con JWT
router.get('/', verifyToken, pedidosController.getPedidos);
router.post('/', verifyToken, pedidosController.searchEan);

module.exports = router;