const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.put('/api/Products', (req, res) => {
  console.log('\n=== Producto recibido ===');
  console.log(JSON.stringify(req.body, null, 2));
  console.log('========================\n');
  res.json({ message: 'Producto recibido correctamente' });
});

// Iniciar servidor
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`\n=== Servidor de prueba ESL ===`);
  console.log(`Escuchando en http://localhost:${PORT}`);
  console.log(`===========================\n`);
}); 