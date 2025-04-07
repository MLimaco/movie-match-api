require('dotenv').config();

const express = require('express');
const router = require('./routes/moviesRoutes');
const { requestLogger, errorHandler, corsMiddleware } = require('./middlewares/middlewares');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const app = express();
const port = process.env.PORT || 3000; // Usar el puerto de .env o 3000 por defecto

// Middleware para manejar JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(corsMiddleware);

// Middleware para registrar solicitudes
app.use(requestLogger);

// Montar las rutas de películas
app.use('/', router);

// Cargar el archivo YAML de Swagger
const swaggerDocument = yaml.load('./docs/swagger.yaml');

// Montar la documentación de Swagger en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para manejar errores no encontrados
app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada." });
});

// Middleware para manejar errores generales
app.use(errorHandler);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Mi servidor está corriendo en el puerto ✅ ${port}`);
    console.log(`http://localhost:${port}`);
    console.log(`Documentación disponible en http://localhost:${port}/api-docs`);
});