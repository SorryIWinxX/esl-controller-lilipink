const pedidoService = require('../services/pedidoService');
const eslService = require('../services/EslService');
class PedidosController {
  constructor() {
    this.frontUrl = process.env.FRONT_URL;
    this.pedidoService = new pedidoService();
    this.getPedidos = this.getPedidos.bind(this);
    this.searchEan = this.searchEan.bind(this);
    this.eslService = new eslService();
    this.eslUbicaciones = JSON.parse(process.env.ESL_UBICACIONES);

  }

  async searchEan(req, res) {
    try {
      const ean = req.body.ean;
      const eliminarProductos = await this.eslService.eliminarTodosProductos();
      const pedidos_ean = await this.pedidoService.buscarPorEan(ean);
      console.log(pedidos_ean);
      const enviarProductos = await this.eslService.enviarProductos(pedidos_ean);

    return res.status(200).json({
      success: true,
      success_eliminarProductos: eliminarProductos,
      success_enviarProductos: enviarProductos,
      message: 'Pedidos encontrado por EAN',
      data: {
        pedido: pedidos_ean
      }
    })
    } catch (error) {
      console.error('Error al buscar por EAN:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }
  

  async getPedidos(req, res) {
    try {
      const pedidos = await this.pedidoService.getAllPedidos();
      return res.status(200).json({
        success: true,
        message: 'Pedidos encontrados',
        data: {
          pedidos: pedidos
        }
      });
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

}

module.exports = new PedidosController(); 