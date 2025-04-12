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

// Ruta para /ESL/%MAC%/LINK/%ID%
app.post('/api/esl/:mac/link/:id', (req, res) => {
  console.log('\n=== ESL Link Request ===');
  console.log('MAC:', req.params.mac);
  console.log('ID:', req.params.id);
  console.log('========================\n');
  res.json({ 
    message: 'ESL vinculado correctamente',
    mac: req.params.mac,
    id: req.params.id
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`\n=== Servidor de prueba ESL ===`);
  console.log(`Escuchando en http://localhost:${PORT}`);
  console.log(`===========================\n`);
}); 