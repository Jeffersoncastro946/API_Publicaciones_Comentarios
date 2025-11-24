import { ComentariosService } from "../services/comentarios.service.js";

export class ComentariosController {
  // GET /api/publicaciones/:publicacionId/comentarios
  // Pública
  static async listar(req, res) {
    try {
      const { publicacionId } = req.params;
      const data = await ComentariosService.listarComentariosPorPublicacion(
        publicacionId
      );

      return res.json(data);
    } catch (err) {
      console.error("Error en ComentariosController.listar:", err);

      return res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error al listar comentarios" });
    }
  }

  // POST /api/publicaciones/:publicacionId/comentarios
  // Protegida (requiere JWT) → userUuid viene del token
  static async crear(req, res) {
    try {
      const { publicacionId } = req.params;
      const { contenido } = req.body;
      console.log("publicacionId:", publicacionId);
      console.log("contenido:", contenido);
      const userUuid = req.user?.id;
      if (!userUuid) {
        return res
          .status(401)
          .json({ message: "No autorizado: usuario no identificado" });
      }

      const nuevo = await ComentariosService.crearComentario({
        contenido,
        userUuid,
        publicacionUuid: publicacionId
      });

      return res.status(201).json(nuevo);
    } catch (err) {
      console.error("Error en ComentariosController.crear:", err);

      return res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error al crear comentario" });
    }
  }

  // PUT /api/comentarios/:comentarioId
  // Protegida (requiere JWT) → solo autor
  static async actualizar(req, res) {
    try {
      const { comentarioId } = req.params;
      const { contenido } = req.body;

      const userUuid = req.user?.id;
      if (!userUuid) {
        return res
          .status(401)
          .json({ message: "No autorizado: usuario no identificado" });
      }

      const actualizado = await ComentariosService.actualizarComentario({
        comentarioUuid: comentarioId,
        userUuid,
        contenido
      });

      return res.json(actualizado);
    } catch (err) {
      console.error("Error en ComentariosController.actualizar:", err);

      return res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error al actualizar comentario" });
    }
  }

  // DELETE /api/comentarios/:comentarioId
  // Protegida (requiere JWT) → solo autor
  static async eliminar(req, res) {
    try {
      const { comentarioId } = req.params;

      const userUuid = req.user?.id;
      if (!userUuid) {
        return res
          .status(401)
          .json({ message: "No autorizado: usuario no identificado" });
      }

      await ComentariosService.eliminarComentario({
        comentarioUuid: comentarioId,
        userUuid
      });

      return res.json({ message: "Comentario eliminado" });
    } catch (err) {
      console.error("Error en ComentariosController.eliminar:", err);

      return res
        .status(err.statusCode || 500)
        .json({ message: err.message || "Error al eliminar comentario" });
    }
  }
}
