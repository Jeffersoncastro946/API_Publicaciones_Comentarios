import { Router } from "express";
import { ComentariosController } from "../controllers/comentarios.controller.js";

const routerComentarios = Router();

/**
 * GET /api/publicaciones/:publicacionId/comentarios
 * Lista todos los comentarios de una publicación
 * Pública (sin auth)
 */
router.get(
  "/api/publicaciones/:publicacionId/comentarios",
  ComentariosController.listar
);

/**
 * POST /api/publicaciones/:publicacionId/comentarios
 * Crea un comentario en una publicación
 * Protegida (requiere JWT)
 */
router.post(
  "/api/publicaciones/:publicacionId/comentarios",
  isAuth,
  ComentariosController.crear
);

/**
 * PUT /api/comentarios/:comentarioId
 * Actualiza un comentario
 * Protegida (solo autor)
 */
router.put(
  "/api/comentarios/:comentarioId",
  isAuth,
  ComentariosController.actualizar
);

/**
 * DELETE /api/comentarios/:comentarioId
 * Elimina un comentario
 * Protegida (solo autor)
 */
router.delete(
  "/api/comentarios/:comentarioId",
  isAuth,
  ComentariosController.eliminar
);

export default routerComentarios;
