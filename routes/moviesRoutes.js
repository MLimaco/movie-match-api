const express = require('express');
const {
    getMoviesByCriteriaController,
    getRandomMovieController,
    getMovieByIdOrNameController,
} = require('../controllers/movieController');

// Crear el enrutador
const router = express.Router();

// Ruta para obtener una película aleatoria
router.get('/', getRandomMovieController);

// Ruta para buscar películas por múltiples criterios (nombre parcial y/o año)
router.get('/movies', getMoviesByCriteriaController);

// Ruta para buscar una película por ID o nombre
router.get('/movies/:idOrName', getMovieByIdOrNameController);

module.exports = router;