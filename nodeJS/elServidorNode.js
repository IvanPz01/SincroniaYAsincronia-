const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Permitir los métodos GET y POST
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Permitir el encabezado Content-Type
  
  if (req.method === 'GET' && req.url === '/') {
    // Si la solicitud es GET y la ruta es '/', devuelve el archivo HTML
    fs.readFile(path.join(__dirname, '../index.html'), (err, data) => { // Lee el archivo index.html
      if (err) { // Si hay un error al leer el archivo
        res.writeHead(500);
        res.end('Error interno del servidor');
        return;
      }
      res.writeHead(200, {'Content-Type': 'text/html'}); // Si no hay error, devuelve el archivo HTML
      res.end(data);
    });
  } else if (req.url === '/proceso1') { // Si la ruta es '/proceso1'
    setTimeout(() => {
      res.setHeader('Content-Type', 'text/plain');
      res.end("Se ejecutó el procedimiento 1");
    }, 2000); // Simular un retraso de 2 segundos
  } else if (req.url === '/proceso2') {
    res.setHeader('Content-Type', 'text/plain');
    res.end("Se ejecutó el procedimiento 2");
  } else {
    res.statusCode = 404;
    res.end('Ruta no encontrada');
  }
});

server.listen(4455, () => {
  console.log('Servidor en ejecución en http://localhost:4455/');
});