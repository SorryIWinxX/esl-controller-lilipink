# Sistema ESL Controller

Sistema para control y gestión de etiquetas electrónicas (ESL) que permite escanear productos y actualizar su información en tiempo real.

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Base de datos PostgreSQL configurada

## Estructura del Proyecto

```
.
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── ControllerESL.js
│   ├── services/
│   │   ├── ServiceESL.js
│   │   ├── ServicePedidos.js
│   │   └── ServiceScanner.js
│   └── test/
│       └── ServiceESL.test.js
├── test-server-esl/
│   ├── server.js
│   ├── test.js
│   └── package.json
└── package.json
```

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd esl-controller-lilipink
```

2. Instalar dependencias del proyecto principal:
```bash
npm install
```

3. Instalar dependencias del servidor de prueba:
```bash
cd test-server-esl
npm install
```

## Configuración

1. Configurar la base de datos en `src/config/database.js`:
```javascript
const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432,
});
```

## Despliegue

1. Iniciar el servidor de prueba (en una terminal):
```bash
cd test-server-esl
npm start
```

2. En otra terminal, ejecutar las pruebas:
```bash
cd src
node test/ServiceESL.test.js
```

## Uso

1. El sistema iniciará mostrando los pedidos disponibles
2. Cuando se solicite, ingrese un código de barras de 13 dígitos
3. El sistema filtrará los pedidos por el EAN ingresado
4. Los pedidos filtrados se enviarán automáticamente al servidor ESL

## Endpoints del Servidor de Prueba

- `PUT /api/products`: Actualiza la información de un producto
  - Body: Objeto con la información del producto
  - Response: Mensaje de confirmación

## Estructura de Datos

### Pedido
```javascript
{
  id: number,
  pedsap: string,
  ola: string,
  cantid: number,
  skusap: string,
  ubica: string,
  ean: string
}
```

## Solución de Problemas

1. Si el servidor no responde:
   - Verificar que el servidor de prueba esté corriendo en el puerto 5001
   - Comprobar la conexión a internet
   - Revisar los logs del servidor

2. Si hay errores de base de datos:
   - Verificar la configuración en database.js
   - Comprobar que la base de datos esté accesible
   - Revisar los logs de la base de datos

## Mantenimiento

- El sistema actualiza automáticamente los pedidos cada 50 segundos
- Los logs se muestran en la consola para facilitar el debugging
- Se recomienda reiniciar el servidor de prueba si se detectan problemas de conexión 