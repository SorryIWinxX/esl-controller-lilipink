require('dotenv').config();
const express = require('express');
const { testConnection } = require('./config/database');
const ControllerPedidos = require('./controllers/ControllerPedidos');
const ControllerESL = require('./controllers/ControllerESL');
const ServiceScanner = require('./services/ServiceScanner');

const app = express();
const pedidosController = new ControllerPedidos();
const eslController = new ControllerESL();
const scanner = new ServiceScanner();

// Middleware
app.use(express.json());

// Rutas para pedidos
app.get('/pedidos/:id', (req, res) => pedidosController.getPedido(req, res));
app.post('/pedidos', (req, res) => pedidosController.crearPedido(req, res));

// Rutas para ESL
app.get('/esl', (req, res) => eslController.getAll(req, res));
app.delete('/esl', (req, res) => eslController.deleteAll(req, res));

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;

// Inicialización del servidor
const startServer = async () => {
  try {
    // Verificar conexión a la base de datos antes de iniciar el servidor
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // Iniciar scanner
    scanner.iniciarEscaneo().catch(console.error);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
