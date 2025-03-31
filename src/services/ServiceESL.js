const ServicePedidos = require('./ServicePedidos');
const ServiceScanner = require('./ServiceScanner');
const ControllerESL = require('../controllers/ControllerESL');

class ServiceESL {
  constructor() {
    this.servicePedidos = new ServicePedidos();
    this.serviceScanner = new ServiceScanner();
    this.controllerESL = new ControllerESL();
  }

  async obtenerDatoScanner() {
    try {
      await this.serviceScanner.iniciarEscaneo();
      const codigoProducto = await this.serviceScanner.escanearProducto();
      return codigoProducto;
    } catch (error) {
      console.error('Error al obtener dato del scanner:', error);
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

  async filtrarPedidosPorEAN(ean) {
    try {
      let pedidos = await this.obtenerPedidos();
      let pedidosFiltrados = [];

      // Buscar en cada grupo de pedidos
      pedidos.forEach(grupo => {
        const pedidosEnGrupo = grupo.filter(pedido => pedido.ean === ean);
        pedidosFiltrados = pedidosFiltrados.concat(pedidosEnGrupo);
      });

      console.log('\n=== Pedidos encontrados para EAN:', ean, '===');
      if (pedidosFiltrados.length === 0) {
        console.log('No se encontraron pedidos con este EAN');
      } else {
        // Agrupar por PEDSAP
        const pedidosAgrupados = pedidosFiltrados.reduce((grupos, pedido) => {
          const pedsap = pedido.pedsap;
          if (!grupos[pedsap]) {
            grupos[pedsap] = [];
          }
          grupos[pedsap].push(pedido);
          return grupos;
        }, {});

        // Mostrar pedidos agrupados
        Object.entries(pedidosAgrupados).forEach(([pedsap, pedidos]) => {
          console.log('\n=====================================');
          console.log(`PEDSAP: ${pedsap}`);
          console.log(`Ola: ${pedidos[0].ola}`);
          console.log('-------------------------------------');
          pedidos.forEach(pedido => {
            console.log(`- Pedido ID: ${pedido.id}`);
            console.log(`  Cantidad: ${pedido.cantid}`);
            console.log(`  SKU: ${pedido.skusap}`);
            console.log(`  Ubicación: ${pedido.ubica}`);
          });
          console.log('=====================================\n');
        });
      }

      return pedidosFiltrados;
    } catch (error) {
      console.error('Error al filtrar pedidos por EAN:', error);
      throw error;
    }
  }
}

module.exports = new ServiceESL(); 