const express = require('express');
const {
    getMoviesByCriteriaController,
    getRandomMovieController,
    getMovieByIdOrNameController,
    getMoviesByGenreController,
    getMoviesSortedByYearController // 👈 Add this
} = require('../controllers/movieController');

// Crear el enrutador
const router = express.Router();

// Ruta para obtener una película aleatoria
router.get('/', getRandomMovieController);

// 1. Rutas específicas primero
router.get('/movies/filter', getMoviesByGenreController);

// 2. Rutas con query parameters
router.get('/movies', (req, res, next) => {
    const { sort, order } = req.query;
    
    if (sort === 'year') {
        getMoviesSortedByYearController(req, res);
    } else {
        getMoviesByCriteriaController(req, res);
    }
});

// 3. Rutas con parámetros dinámicos al final
router.get('/movies/:idOrName', getMovieByIdOrNameController);

module.exports = router;