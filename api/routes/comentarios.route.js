import { Router } from "express";
import { ComentariosController } from "../controllers/comentarios.controller.js";

const routerComentarios = Router();

/**
 * GET /api/publicaciones/:publicacionId/comentarios
 * Lista todos los comentarios de una publicación
 * Pública (sin auth)
 */
routerComentarios.get(
  "/api/publicaciones/:publicacionId/comentarios",
  ComentariosController.listar
);

/**
 * POST /api/publicaciones/:publicacionId/comentarios
 * Crea un comentario en una publicación
 * Protegida (requiere JWT)
 */
routerComentarios.post(
  "/api/publicaciones/:publicacionId/comentarios",
  ComentariosController.crear
);

/**
 * PUT /api/comentarios/:comentarioId
 * Actualiza un comentario
 * Protegida (solo autor)
 */
routerComentarios.put(
  "/api/comentarios/:comentarioId",

  ComentariosController.actualizar
);

/**
 * DELETE /api/comentarios/:comentarioId
 * Elimina un comentario
 * Protegida (solo autor)
 */
routerComentarios.delete(
  "/api/comentarios/:comentarioId",

  ComentariosController.eliminar
);

export default routerComentarios;
