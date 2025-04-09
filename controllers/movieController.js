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
    const { name, year, director } = req.query;

    try {
        getMoviesByCriteria({ name, year, director }, (movies) => {
            if (movies.length === 0) {
                // Mensaje de error específico para búsqueda por director
                const errorMessage = director 
                    ? "No movies found for the requested director."
                    : "No se encontraron resultados para la búsqueda.";
                
                res.status(404).json({ error: errorMessage });
            } else {
                res.status(200).json(movies);
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar las películas.' });
    }
}
function getMoviesByGenreController(req, res) {
    const { genre } = req.query;

    if (!genre) {
        return res.status(400).json({ error: "El parámetro 'genre' es obligatorio." });
    }

    try {
        getAllMovies((movies) => {
            if (movies.length === 0) {
                res.status(404).json({ error: "No se encontraron películas para el género solicitado." });
            } else {
                res.status(200).json(movies);
            }
        }, genre);
    } catch (error) {
        res.status(500).json({ error: "Error al filtrar por género." });
    }
}

const { getMoviesSortedByYear } = require('../services/movieServices');

function getMoviesSortedByYearController(req, res) {
    const { sort, order } = req.query;

    // Solo procesar si sort=year
    if (sort !== 'year') {
        return getAllMoviesController(req, res);
    }

    // Validar el parámetro order
    const validOrder = order === 'desc' ? 'desc' : 'asc';

    try {
        getMoviesSortedByYear((movies) => {
            if (movies.length === 0) {
                res.status(404).json({ error: "No se encontraron películas." });
            } else {
                res.status(200).json(movies);
            }
        }, validOrder);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las películas ordenadas." });
    }
}


module.exports = {
    getMoviesByCriteriaController,
    getAllMoviesController,
    getRandomMovieController,
    getMovieByIdOrNameController,
    getMovieByTitleController,
    getMoviesByGenreController, 
    getMoviesSortedByYearController, // 👈 nuevo
};