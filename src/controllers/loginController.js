const pedidoService = require('../services/pedidoService');
const jwt = require('jsonwebtoken');

// Clave secreta para firmar los tokens (debería estar en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_aqui';

class LoginController {
  constructor() {
    // Simulación de base de datos de usuarios
    this.users = [
      { idEmpleado: '123', numeroGrupo: '456' },
      { idEmpleado: '789', numeroGrupo: '012' }
    ];
    this.pedidoService = new pedidoService();
    // Bind this para evitar problemas de contexto
    this.login = this.login.bind(this);
  }

  async login(req, res) {
    try {
      const { idEmpleado, numeroGrupo } = req.body;

      if (!idEmpleado || !numeroGrupo) {
        return res.status(400).json({
          success: false,
          message: 'Faltan credenciales: ID de empleado y Grupo'
        });
      }

      // Validar que el ID de empleado tenga máximo 20 caracteres
      if (idEmpleado.length > 20) {
        return res.status(400).json({
          success: false,
          message: 'El ID de empleado no puede exceder 20 caracteres'
        });
      }

      const user = this.users.find(u => 
        u.idEmpleado === idEmpleado && u.numeroGrupo === numeroGrupo
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }
      
      // Generar token JWT
      const token = jwt.sign(
        { 
          idEmpleado: user.idEmpleado,
          numeroGrupo: user.numeroGrupo 
        }, 
        JWT_SECRET,
        { expiresIn: '8h' } // Token válido por 8 horas
      );

      return res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: {
          idEmpleado: user.idEmpleado,
          numeroGrupo: user.numeroGrupo,
          token
        }
      });
    } catch (error) {
      console.error('Error en login:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
      });
    }
  }

}

module.exports = new LoginController();
