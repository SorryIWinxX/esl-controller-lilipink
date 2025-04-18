const axios = require('axios');
const https = require('https');

async function testRequest() {
    const baseURL = 'https://localhost:5001/api';
    const apiKey = '39A2979A-1437-46ED-B5DB-B359ABB6B61E';
    
    // Configurar axios con la autenticación y el agente HTTPS
    const api = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        timeout: 5000,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false // Permite certificados autofirmados
        })
    });

    const producto = [{
        id: 1,
        EAN: "7703907805305",
        ubicacion: "A1-01",
        cantidad: 5
    }];

    try {
        console.log('=== Enviando petición PUT ===');
        console.log('URL:', `${baseURL}/Products`);
        console.log('Headers:', {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        });
        console.log('Body:', JSON.stringify(producto, null, 2));
        console.log('=======================');

        const response = await api.put('/Products', producto);
        console.log('Respuesta del servidor:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Detalles del error:', error.response.data);
        }
    }
}

async function getProducts() {
    const baseURL = 'https://localhost:5001/api';
    const apiKey = '39A2979A-1437-46ED-B5DB-B359ABB6B61E';
    
    // Configurar axios con la autenticación y el agente HTTPS
    const api = axios.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
        timeout: 5000,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false // Permite certificados autofirmados
        })
    });

    try {
        console.log('\n=== Obteniendo productos ===');
        console.log('URL:', `${baseURL}/Products`);
        console.log('Headers:', {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        });
        console.log('=======================');

        const response = await api.get('/Products');
        console.log('Productos obtenidos:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        if (error.response) {
            console.error('Detalles del error:', error.response.data);
        }
    }
}

// Ejecutar las pruebas
async function runTests() {
    await testRequest();
    await getProducts();
}

// Desactivar la verificación de certificados a nivel global
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

runTests(); 