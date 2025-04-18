const ServiceESL = require('../services/EslService');

class ControllerESL {
  constructor() {
    this.serviceESL = new ServiceESL();
  }

  async enviarProductos(req, res) {
    try {
      const { pedidos } = req.body;
      const result = await this.serviceESL.enviarProductos(pedidos);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async eliminarProductos(req, res) {
    try {
      const { pedidos } = req.body;
      const result = await this.serviceESL.eliminarProductos(pedidos);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async obtenerProductos(req, res) {
    try {
      const result = await this.serviceESL.obtenerProductos();
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async enviarSonido(req, res) {
    try {
      const { mac } = req.params;
      const result = await this.serviceESL.enviarSonido(mac);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.serviceESL.obtenerProductos();
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async deleteAll(req, res) {
    try {
      const result = await this.serviceESL.eliminarProductos([]);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ControllerESL; 