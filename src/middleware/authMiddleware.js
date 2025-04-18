const jwt = require('jsonwebtoken');

// Clave secreta para verificar tokens (debe coincidir con la usada en loginController)
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_aqui';

/**
 * Middleware para verificar token JWT
 */
const verifyToken = (req, res, next) => {
  // Obtener el token del header Authorization
  const bearerHeader = req.headers['authorization'];
  
  if (!bearerHeader) {
    return res.status(401).json({ 
      success: false, 
      message: 'Acceso denegado. Token no proporcionado.' 
    });
  }

  try {
    // Formato típico: "Bearer TOKEN"
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Formato de token inválido' 
      });
    }

    // Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Agregar usuario decodificado al request para uso posterior
    req.user = decoded;
    
    // Continuar con la siguiente función en la cadena
    next();
  } catch (error) {
    console.error('Error verificando token:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Token inválido o expirado' 
    });
  }
};

module.exports = { verifyToken };