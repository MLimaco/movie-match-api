const fs = require('fs');
const csv = require('csv-parser');

/**
 * Obtiene una película aleatoria del archivo CSV.
 * @param {function} callback - Función callback que recibe una película aleatoria.
 */
function getRandomMovie(callback) {
    const movies = [];

    fs.createReadStream('data/movies.csv')
        .pipe(csv())
        .on('data', (row) => {
            movies.push({
                id: row.id,
                title: row.title,
                year: row.year,
                genre: row.genre,
                director: row.director,
                synopsis: row.plot
            });
        })
        .on('end', () => {
            const randomIndex = Math.floor(Math.random() * movies.length);
            callback(movies[randomIndex]);
        });
}

/**
 * Busca una película por su título.
 * @param {string} movieName - El título de la película a buscar.
 * @param {function} callback - Función callback que recibe la película encontrada o null si no se encuentra.
 */
function getMovieByTitle(movieName, callback) {
    let movieFound = null;

    fs.createReadStream('data/movies.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.title.toLowerCase() === movieName.toLowerCase()) {
                movieFound = {
                    id: row.id,
                    title: row.title,
                    year: row.year,
                    genre: row.genre,
                    director: row.director,
                    synopsis: row.plot
                };
            }
        })
        .on('end', () => {
            callback(movieFound);
        });
}

/**
 * Busca una película por su ID o título.
 * @param {string} idOrName - El ID o título de la película a buscar.
 * @param {function} callback - Función callback que recibe la película encontrada o null si no se encuentra.
 */
function getMovieByIdOrName(idOrName, callback) {
    let movieFound = null;

    fs.createReadStream('data/movies.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (
                row.id.toLowerCase() === idOrName.toLowerCase() ||
                row.title.toLowerCase() === idOrName.toLowerCase()
            ) {
                movieFound = {
                    id: row.id,
                    title: row.title,
                    year: row.year,
                    genre: row.genre,
                    director: row.director,
                    synopsis: row.plot
                };
            }
        })
        .on('end', () => {
            callback(movieFound);
        });
}

/**
 * Obtiene todas las películas del archivo CSV, con la opción de filtrar por género.
 * @param {function} callback - Función callback que recibe un array de películas.
 * @param {string|null} genre - Género opcional para filtrar las películas.
 */
function getAllMovies(callback, genre = null) {
    const movies = [];

    fs.createReadStream('data/movies.csv')
        .pipe(csv())
        .on('data', (row) => {
            const movie = {
                id: row.id,
                title: row.title,
                year: row.year,
                genre: row.genre,
                director: row.director,
                synopsis: row.plot
            };

            // Si hay un género especificado, filtra las películas
            if (!genre || movie.genre.toLowerCase().includes(genre.toLowerCase())) {
                movies.push(movie);
            }
        })
        .on('end', () => {
            callback(movies); // Llama al callback con el array de películas
        })
        .on('error', (err) => {
            console.error('Error al leer el archivo CSV:', err);
            callback([]); // Devuelve un array vacío en caso de error
        });
}

/**
 * Obtiene todas las películas ordenadas por año
 * @param {function} callback - Función callback que recibe un array de películas
 * @param {string} order - Orden de clasificación ('asc' o 'desc')
 */
function getMoviesSortedByYear(callback, order = 'asc') {
    const movies = [];

    fs.createReadStream('data/movies.csv')
        .pipe(csv())
        .on('data', (row) => {
            movies.push({
                id: row.id,
                title: row.title,
                year: row.year,
                genre: row.genre,
                director: row.director,
                synopsis: row.plot
            });
        })
        .on('end', () => {
            // Ordenar películas por año
            const sortedMovies = movies.sort((a, b) => {
                if (order === 'desc') {
                    return parseInt(b.year) - parseInt(a.year);
                }
                return parseInt(a.year) - parseInt(b.year);
            });
            callback(sortedMovies);
        })
        .on('error', (err) => {
            console.error('Error al leer el archivo CSV:', err);
            callback([]);
        });
}

/**
 * Busca películas por múltiples criterios (nombre parcial y/o año).
 * @param {object} criteria - Objeto con los criterios de búsqueda (name, year).
 * @param {function} callback - Función callback que recibe un array de películas filtradas.
 */
function getMoviesByCriteria(criteria, callback) {
    const movies = [];

    fs.createReadStream('data/movies.csv')
        .pipe(csv())
        .on('data', (row) => {
            const movie = {
                id: row.id,
                title: row.title,
                year: row.year,
                genre: row.genre,
                director: row.director,
                synopsis: row.plot
            };

            // Filtrar por nombre parcial y/o año
            const matchesName = criteria.name
                ? movie.title.toLowerCase().includes(criteria.name.toLowerCase())
                : true;
            const matchesYear = criteria.year
                ? movie.year === criteria.year
                : true;

            if (matchesName && matchesYear) {
                movies.push(movie);
            }
        })
        .on('end', () => {
            callback(movies); // Devuelve las películas filtradas
        })
        .on('error', (err) => {
            console.error('Error al leer el archivo CSV:', err);
            callback([]); // Devuelve un array vacío en caso de error
        });
}

module.exports = { getMoviesByCriteria, getAllMovies, getRandomMovie, getMovieByIdOrName, getMovieByTitle, getMoviesSortedByYear };