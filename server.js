const http = require('http');
const { getRandomMovie } = require('./movieUtils');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        getRandomMovie((movie) => {
            if (movie) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(movie));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('No se encontró ninguna película.');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada.');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});