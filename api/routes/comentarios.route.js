import { Router } from "express";
import { ComentariosController } from "../controllers/comentarios.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const routerComentarios = Router();

/**
 * GET /api/publicaciones/:publicacionId/comentarios
 * Pública: lista comentarios de una publicación
 */
routerComentarios.get(
  "/publicaciones/:publicacionId/comentarios",
  ComentariosController.listar
);

/**
 * POST /api/publicaciones/:publicacionId/comentarios
 * Protegida: requiere JWT
 */
routerComentarios.post(
  "/publicaciones/:publicacionId/comentarios",
  verifyToken,
  ComentariosController.crear
);

/**
 * PUT /api/comentarios/:comentarioId
 * Protegida: requiere JWT (solo autor)
 */
routerComentarios.put(
  "/comentarios/:comentarioId",
  verifyToken,
  ComentariosController.actualizar
);

/**
 * DELETE /api/comentarios/:comentarioId
 * Protegida: requiere JWT (solo autor)
 */
routerComentarios.delete(
  "/comentarios/:comentarioId",
  verifyToken,
  ComentariosController.eliminar
);

export default routerComentarios;
