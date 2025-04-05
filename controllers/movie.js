const { getMovieByTitle } = require('./movieUtils');

// Obtener el nombre de la película desde los argumentos de la línea de comandos
const movieName = process.argv[2];

if (!movieName) {
    console.error('Por favor, proporciona el nombre de la película.');
    process.exit(1);
}

// Buscar la película y mostrar la ficha técnica
getMovieByTitle(movieName, (movie) => {
    if (movie) {
        console.log(movie);
    } else {
        console.log('Película no encontrada.');
    }
    console.log('Búsqueda completada.');
});