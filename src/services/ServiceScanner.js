const readline = require('readline');

class ServiceScanner {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async iniciarEscaneo() {
    console.log('Iniciando escáner...');
    console.log('Ingrese el código de barras (13 dígitos):');
  }

  async escanearProducto() {
    try {
      const codigoProducto = await new Promise((resolve) => {
        this.rl.question('', (input) => {
          resolve(input.trim());
        });
      });
      
      if (codigoProducto.length !== 13) {
        throw new Error('El código debe tener exactamente 13 caracteres');
      }

      console.log('Producto escaneado:', codigoProducto);
      return codigoProducto;
    } catch (error) {
      console.error('Error al escanear producto:', error);
      throw error;
    }
  }
}

module.exports = ServiceScanner; 