require('dotenv').config();
const express = require('express');
const { testConnection } = require('./config/database');
const cors = require('cors');
const eslRoutes = require('./routes/eslRoutes');
const pedidosRoutes = require('./routes/pedidosRoutes');
const loginRoutes = require('./routes/loginRoutes');
const healthRoutes = require('./routes/healthRoute');
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/login', loginRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/esl', eslRoutes);
app.use('/api/health', healthRoutes);

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

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

