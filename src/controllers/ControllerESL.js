const ServiceESL = require('../services/ServiceESL');
const axios = require('axios');

class ControllerESL {
  constructor() {
    this.baseURL = 'http://localhost:5001/api';
    this.eslUbicaciones = {
      "B2EE07DA": "A1-01",
      "B2EE07DE": "A1-02",
      "B2EE04C8": "A1-03",
      "B2EE07FD": "A1-04",
      "B2EE0800": "A1-05"
    };
  }

  async enviarProductos(pedidos) {
    try {
      console.log('\nEnviando a tabla ESL...');
      // Enviar cada pedido como una petición PUT separada
      for (const pedido of pedidos) {
        const producto = {
          id: pedido.id,
          EAN: pedido.ean,
          ubicacion: pedido.ubica,
          cantidad: pedido.cantid
        };
        const response = await axios.put(`${this.baseURL}/Products`, producto);
        console.log(`Producto enviado: ${pedido.id}`);
        console.log('Respuesta del servidor:' + response.data);

        // Encontrar la MAC correspondiente a la ubicación
        const mac = Object.keys(this.eslUbicaciones).find(key => 
          this.eslUbicaciones[key] === pedido.ubica
        );

        if (mac) {
          console.log('\n=== Debug Info ===');
          console.log('Ubicación del producto:', pedido.ubica);
          console.log('MAC encontrada:', mac);
          console.log('ID del producto:', pedido.id);
          console.log('URL completa:', `${this.baseURL}/esl/${mac}/link/${pedido.id}`);
          console.log('================\n');

          const response2 = await axios.post(`${this.baseURL}/esl/${mac}/link/${pedido.id}`, {});
          console.log(`Producto ${pedido.id} vinculado a ESL ${mac}`);
          console.log('Respuesta del servidor:', response2.data);
        } else {
          console.warn(`No se encontró MAC para la ubicación ${pedido.ubica}`);
          console.log('Ubicaciones disponibles:', this.eslUbicaciones);
        }
      }

      console.log('Todos los productos han sido enviados\n');
      return true;
    } catch (error) {
      console.error('Error al enviar productos:', error.message);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      throw error;
    }
  }
}

module.exports = ControllerESL; 