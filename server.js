import express from 'express';
import { loadEnvFile } from 'node:process';
import { es } from 'zod/locales';
import { config } from 'zod';

import { errorHandler } from "./api/middlewares/errorHandler.js";
import pubRouter from "./api/routes/publicaciones.route.js";
import authRouter from "./api/routes/auth.route.js";

config(es());
loadEnvFile();

const app = express();

if (!process.env.PORT) {
  throw new Error("No se ha cargado el puerto del .env");
}

const PORT = process.env.PORT;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas reales
app.use('/api/auth', authRouter);
app.use('/api/publicaciones', pubRouter);

// Ruta inicial (solo GET)
app.get('/api', (req, res) => {
  res.send('Bienvenido al proyecto de publicaciones y comentarios');
});

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
