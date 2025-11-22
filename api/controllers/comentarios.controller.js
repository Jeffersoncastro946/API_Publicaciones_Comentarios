import { ComentariosService } from "../services/comentarios.service.js";

export class ComentariosController {
  static async listar(req, res) {
    try {
      const { publicacionId } = req.params;
      const data = await ComentariosService.listarComentariosPorPublicacion(
        publicacionId
      );
      res.json(data);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }

  static async crear(req, res) {
    try {
      const { publicacionId } = req.params;
      const { contenido, user_id } = req.body;
      const userUuid = req.user?.id ?? user_id;
      if (!userUuid) {
        return res
          .status(400)
          .json({ message: "user_id requerido si no hay JWT" });
      }
      const nuevo = await ComentariosService.crearComentario({
        contenido,
        userUuid,
        publicacionUuid: publicacionId,
      });

      res.status(201).json(nuevo);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }

  static async actualizar(req, res) {
    try {
      const { comentarioId } = req.params;
      const { contenido, user_id } = req.body;
      const userUuid = req.user?.id ?? user_id;
      if (!userUuid) {
        return res
          .status(400)
          .json({ message: "user_id requerido si no hay JWT" });
      }

      const actualizado = await ComentariosService.actualizarComentario({
        comentarioUuid: comentarioId,
        userUuid,
        contenido,
      });

      res.json(actualizado);
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }

  static async eliminar(req, res) {
    try {
      const { comentarioId } = req.params;
      const { user_id } = req.body;
      const userUuid = req.user?.id ?? user_id;
      if (!userUuid) {
        return res
          .status(400)
          .json({ message: "user_id requerido si no hay JWT" });
      }

      await ComentariosService.eliminarComentario({
        comentarioUuid: comentarioId,
        userUuid,
      });

      res.json({ message: "Comentario eliminado" });
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message });
    }
  }
}
