const express = require('express');
const router = require('./routes/moviesRoutes');

const app = express();
const port = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Montar las rutas de películas
app.use('/', router);

// Middleware para manejar errores no encontrados
app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada." });
});

// Middleware para manejar errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Ocurrió un error en el servidor." });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Mi servidor está corriendo en el puerto ✅ ${port}`);
    console.log(`http://localhost:${port}`);
});