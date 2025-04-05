const { getAllMovies } = require('../services/movieServices');
const { getRandomMovie, getMovieByTitle, getMovieByIdOrName } = require('../services/movieServices');

// Función para obtener todas las películas
function getAllMoviesController(req, res) {
    try {
        getAllMovies((movies) => {
            res.status(200).json(movies); // Envía las películas como respuesta JSON
        });
    } catch (error) {
        res.status(500).send('Error al obtener las películas.');
    }
}
// Controlador que filtra las películas del año 1990
function getMoviesByYearController(req, res) {
    const year = req.query.year;
    const movies = getAllMovies().filter(movie => movie.year === year);
    res.json(movies);
}

// Función para obtener una película aleatoria
function getRandomMovieController(req, res) {
    try {
        getRandomMovie((movie) => {
            res.status(200).json(movie);
        });
    } catch (error) {
        res.status(500).send('Error al obtener una película aleatoria.');
    }
}

// Función para buscar una película por título
function getMovieByTitleController(req, res) {
    const movieName = req.params.title;

    try {
        getMovieByTitle(movieName, (movie) => {
            if (movie) {
                res.status(200).json(movie);
            } else {
                res.status(404).send('Película no encontrada.');
            }
        });
    } catch (error) {
        res.status(500).send('Error al buscar la película.');
    }
}

// Función para buscar una película por ID o nombre
function getMovieByIdOrNameController(req, res) {
    const idOrName = req.params.idOrName;

    try {
        getMovieByIdOrName(idOrName, (movie) => {
            if (!movie) {
                // Si no se encuentra la película, devolver error 404
                res.status(404).json({ error: "No se encontraron resultados para la búsqueda." });
            } else {
                res.status(200).json(movie); // Devuelve la película encontrada
            }
        });
    } catch (error) {
        res.status(500).send('Error al buscar la película.');
    }
}

const { getMoviesByCriteria } = require('../services/movieServices');

/**
 * Controlador para buscar películas por múltiples criterios (nombre parcial y/o año).
 */
function getMoviesByCriteriaController(req, res) {
    const { name, year } = req.query;

    try {
        getMoviesByCriteria({ name, year }, (movies) => {
            if (movies.length === 0) {
                // Si no se encuentran películas, devolver error 404
                res.status(404).json({ error: "No se encontraron resultados para la búsqueda." });
            } else {
                res.status(200).json(movies); // Devuelve las películas encontradas
            }
        });
    } catch (error) {
        res.status(500).send('Error al buscar las películas.');
    }
}
module.exports = {
    getMoviesByCriteriaController,
    getAllMoviesController,
    getRandomMovieController,
    getMovieByIdOrNameController,
    getMovieByTitleController,
};