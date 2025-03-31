const serviceESL = require('../services/ServiceESL');

async function testServiceESL() {
  try {
    console.log('=== Iniciando pruebas de ServiceESL ===\n');

    // Prueba 1: Obtener pedidos
    console.log('Prueba 1: Obteniendo pedidos...');
    const pedidos = await serviceESL.obtenerPedidos();
    console.log('----------------------------------------\n');

    // Prueba 2: Escanear producto
    console.log('Prueba 2: Escaneando producto...');
    console.log('Por favor, ingrese un código de 13 dígitos:');
    const codigoProducto = await serviceESL.obtenerDatoScanner();
    console.log('Código escaneado:', codigoProducto);
    console.log('----------------------------------------\n');

    // Prueba 3: Filtrar pedidos por EAN
    console.log('Prueba 3: Filtrando pedidos por EAN...');
    const pedidosFiltrados = await serviceESL.filtrarPedidosPorEAN(codigoProducto);
    console.log('----------------------------------------\n');
    console.log('=== Pruebas completadas ===');

    // Prueba 4: Enviar pedidos al servidor
   console.log('Prueba 4: Enviando pedidos al servidor...');
   if (pedidosFiltrados && pedidosFiltrados.length > 0) {
     await serviceESL.controllerESL.enviarProductos(pedidosFiltrados);
     console.log('Pedidos enviados correctamente');
   } else {
     console.log('No hay pedidos para enviar');
   }
   console.log('----------------------------------------\n');
  } catch (error) {
    console.error('Error durante las pruebas:', error);
  }

   
}

// Ejecutar las pruebas
testServiceESL(); 