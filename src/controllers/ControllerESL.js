const ServiceESL = require('../services/ServiceESL');
const axios = require('axios');

class ControllerESL {
  constructor() {
    this.baseURL = 'http://localhost:5001/api';
  }

  async deleteAll(req, res) {
    
  }

  async getAll(req, res) {
   
  }

  async enviarProductos(pedidos) {
    try {
      console.log('\nEnviando a tabla ESL...');
      // Enviar cada pedido como una petición PUT separada
      for (const pedido of pedidos) {
        const url = `${this.baseURL}/products`;
        const response = await axios.put(url, pedido);
        console.log(`Producto enviado: ${pedido.id}`);
        console.log('Respuesta del servidor:' + response.data);
      }

      console.log('Todos los productos han sido enviados\n');
      return true;
    } catch (error) {
      console.error('Error al enviar productos:', error.message);
      throw error;
    }
  }
}

module.exports = ControllerESL; 