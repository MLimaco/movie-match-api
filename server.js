const http = require('http');
const url = require('url'); // Importar módulo para manejar query params
const { getRandomMovie, getAllMovies, getMovieByIdOrName } = require('./movieUtils');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Ruta raíz: devuelve una película aleatoria
        getRandomMovie((movie) => {
            if (movie) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(movie));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('No se encontró ninguna película.');
            }
        });
    } else if (req.url.startsWith('/movies') && req.method === 'GET') {
        // Parsear la URL para obtener los query params
        const parsedUrl = url.parse(req.url, true);
        const genre = parsedUrl.query.genre; // Obtener el parámetro "genre"

        // Obtener películas con o sin filtro por género
        getAllMovies((movies) => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(movies));
        }, genre);
    } else if (req.url.startsWith('/movies/') && req.method === 'GET') {
        // Ruta para buscar una película específica por ID o nombre
        const idOrName = decodeURIComponent(req.url.split('/movies/')[1]);

        getMovieByIdOrName(idOrName, (movie) => {
            if (movie) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(movie));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Película no encontrada.');
            }
        });
    } else {
        // Ruta no encontrada
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada.');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});