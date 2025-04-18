const ServicePedidos = require('./pedidoService');
const axios = require('axios');
const https = require('https');
require('dotenv').config();

class ServiceESL {
  constructor() {
    this.servicePedidos = new ServicePedidos();
    this.baseURL = process.env.ESL_API_BASE_URL;
    this.eslUbicaciones = JSON.parse(process.env.ESL_UBICACIONES);
    this.headers = {
      'x-api-key': process.env.ESL_API_KEY,
      'Content-Type': 'application/json'
    };

    this.api = axios.create({
      baseURL: this.baseURL,
      headers: this.headers,
      timeout: parseInt(process.env.ESL_TIMEOUT),
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
        secureProtocol: 'TLSv1_2_method'
      })
    });
  }

  async enviarProductos(pedidos) {
    try {
      for (const pedido of pedidos) {
        const producto = [{
          id: pedido.id,
          EAN: pedido.ean,
          ubicacion: pedido.ubica,
          cantidad: pedido.cantid
        }];

        const response = await this.api.put('/Products', producto);
        console.log(response.data);

        const mac = Object.keys(this.eslUbicaciones).find(key => 
          this.eslUbicaciones[key] === pedido.ubica
        );

        if (mac) {
          await this.linkESL(mac, pedido.id);
        } else {
          console.warn(`No se encontró MAC para la ubicación ${pedido.ubica}`);
        }
      }
      return true;
    } catch (error) {
      console.error('Error al enviar productos:', error.message);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      throw error;
    }
  }

  async linkESL(mac, productId) {
    try {
      const response = await this.api.post(`/esl/${mac}/link/${productId}`, {});
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      throw error;
    }
  }

  async eliminarProductos(pedidos) {
    try {
      if (!pedidos || pedidos.length === 0) {
        return await this.eliminarTodosProductos();
      }
      
      for (const pedido of pedidos) {
        const producto = [{
          id: pedido.id,
          EAN: pedido.ean,
          ubicacion: pedido.ubica,
          cantidad: pedido.cantid
        }];

        const response = await this.api.delete('/Products', { data: producto });
        return response.data;
      }
      return true;
    } catch (error) {
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      throw error;
    }
  }

  async eliminarTodosProductos() {
    try {
      const productos = await this.obtenerProductos();
      if (productos && productos.length > 0) {
        await this.api.delete('/Products', { data: productos });
        console.log('Todos los productos han sido eliminados');
        return true;
      }
      return true;
    } catch (error) {
      console.error('Error al eliminar todos los productos:', error.message);
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      return false;
    }
  }

  async obtenerProductos() {
    try {
      const response = await this.api.get('/Products');
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      throw error;
    }
  }

  async enviarSonido(mac) {
    try {
      const response = await this.api.post(`/esl/${mac}/SOUND/130/HIGH/1318,1567,2637,2093,2349,3135`);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Detalles del error:', error.response.data);
      }
      throw error;
    }
  }


  async obtenerPedidos() {
    try {
      const pedidos = await this.servicePedidos.getAllPedidos();
      return pedidos;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw error;
    }
  }
}

module.exports = ServiceESL; 