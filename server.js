import express from "express";
import dotenv from "dotenv";
import { es } from "zod/locales";
import { config } from "zod";
import { errorHandler } from "./api/middlewares/errorHandler.js";
import pubRouter from "./api/routes/publicaciones.route.js";
import authRouter from "./api/routes/auth.route.js";
import routerComentarios from "./api/routes/comentarios.route.js";

config(es());

dotenv.config();
const app = express();

if (!process.env.PORT) {
  throw new Error("No se ha cargado el puerto del .env");
}
const PORT = process.env.PORT;

//Nuestros middlewares
app.use(express.urlencoded());
app.use(express.json());

//Rutas
app.use("/auth", authRouter);
app.use("/api/",routerComentarios);
app.use("/api/publicaciones", pubRouter);
app.use("/api/", (req, res) => {
  return res.send("Bienvenido al proyecto de publicaciones y comentarios");
});

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
