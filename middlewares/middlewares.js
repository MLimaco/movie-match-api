const cors = require('cors');

/**
 * Middleware para registrar solicitudes con timestamp, método y ruta.
 */
function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
}

/**
 * Middleware para manejar errores globalmente.
 */
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ error: "Ocurrió un error en el servidor." });
}

/**
 * Middleware de CORS para habilitar solicitudes desde otros dominios.
 */
const corsMiddleware = cors();

module.exports = { requestLogger, errorHandler, corsMiddleware };