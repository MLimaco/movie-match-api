const fs = require('fs');
const csv = require('csv-parser');

function getMovieByTitle(movieName, callback) {
    let movieFound = null;

    fs.createReadStream('data/movies.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (row.title.toLowerCase() === movieName.toLowerCase()) {
                movieFound = {
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

function getRandomMovie(callback) {
    const movies = [];

    fs.createReadStream('data/movies.csv')
        .pipe(csv())
        .on('data', (row) => {
            movies.push({
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
            callback(movies);
        });
}

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

module.exports = { getMovieByTitle, getRandomMovie, getAllMovies, getMovieByIdOrName };