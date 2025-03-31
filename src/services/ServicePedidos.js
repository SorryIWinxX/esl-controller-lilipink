const pool = require('../config/database');

class ServicePedidos {
  

  async getAllPedidos() {
    try {
      const query = 'SELECT * FROM pedidos';
      const pedidos = await pool.query(query);
      const pedidosOrdenados = this.sorterPedidos(pedidos.rows);
      return pedidosOrdenados;
    } catch (error) {
      console.error('Error al obtener pedidos:', error);
      throw error;
    }
  }

  sorterPedidos(pedidos) {
    const pedidosAgrupados = pedidos.reduce((grupos, pedido) => {
      const pedsap = pedido.pedsap;
      if (!grupos[pedsap]) {
        grupos[pedsap] = [];
      }
      grupos[pedsap].push(pedido);
      return grupos;
    }, {});

    console.log('\n=== Grupos de Pedidos ===');
    Object.entries(pedidosAgrupados).forEach(([pedsap, pedidos]) => {
      console.log(`\nGrupo PEDSAP: ${pedsap}`);
      console.log(`Cantidad de pedidos: ${pedidos.length}`);
      pedidos.forEach(pedido => {
        console.log(`- Pedido ID: ${pedido.id}, Ola: ${pedido.ola}`);
      });
    });
    console.log('\n=======================\n');

    return Object.values(pedidosAgrupados);
  }
}

module.exports = ServicePedidos; 