// src/services/ComentariosService.js
import pool from "../config/db/mysql_db.js";
import { sanitize } from "../utils/sanitize.js";
import { randomUUID } from "crypto";

export class ComentariosService {
  // ============================================
  //  Listar comentarios de una publicación
  // ============================================
  static async listarComentariosPorPublicacion(publicacionUuid) {
    const [rows] = await pool.query(
      `
      SELECT
        BIN_TO_UUID(c.id) AS id,
        c.contenido,
        c.created_at,
        BIN_TO_UUID(u.id) AS user_id,
        u.name AS user_name,
        u.email AS user_email
      FROM comentarios c
      JOIN usuarios u ON u.id = c.user_id
      WHERE c.publicacion_id = UUID_TO_BIN(?)
      ORDER BY c.created_at ASC
      `,
      [publicacionUuid]
    );

    return rows;
  }

  // ============================================
  //  Crear comentario
  // ============================================
  static async crearComentario({ contenido, userUuid, publicacionUuid }) {
    const contenidoLimpio = sanitize(contenido ?? "");

    if (!contenidoLimpio.trim()) {
      const error = new Error("El contenido no puede estar vacío");
      error.statusCode = 400;
      throw error;
    }

    // Validar que la publicación exista
    const [pubRows] = await pool.query(
      "SELECT 1 FROM publicaciones WHERE id = UUID_TO_BIN(?) LIMIT 1",
      [publicacionUuid]
    );

    if (pubRows.length === 0) {
      const error = new Error("La publicación no existe");
      error.statusCode = 404;
      throw error;
    }

    // UUID para el comentario
    const comentarioUuid = randomUUID();

    await pool.query(
      `
      INSERT INTO comentarios (id, contenido, user_id, publicacion_id)
      VALUES (UUID_TO_BIN(?), ?, UUID_TO_BIN(?), UUID_TO_BIN(?))
      `,
      [comentarioUuid, contenidoLimpio, userUuid, publicacionUuid]
    );

    // Retornar comentario nuevo
    const [[comentario]] = await pool.query(
      `
      SELECT
        BIN_TO_UUID(c.id) AS id,
        c.contenido,
        c.created_at,
        BIN_TO_UUID(c.user_id) AS user_id,
        BIN_TO_UUID(c.publicacion_id) AS publicacion_id
      FROM comentarios c
      WHERE c.id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [comentarioUuid]
    );

    return comentario;
  }

  // TODO ESTO DEBE SER CUANDO ESTE EL TOKEN
  //   static async crear(req, res) {
  //   try {
  //     const { publicacionId } = req.params;
  //     const { contenido } = req.body;
  //     const userUuid = req.user.id; //  SOLO del token

  //     if (!contenido || typeof contenido !== "string" || !contenido.trim()) {
  //       return res.status(400).json({ message: "El contenido no puede estar vacío" });
  //     }

  //     const nuevo = await ComentariosService.crearComentario({
  //       contenido,
  //       userUuid,
  //       publicacionUuid: publicacionId,
  //     });

  //     res.status(201).json(nuevo);
  //   } catch (err) {
  //     res.status(err.statusCode || 500).json({ message: err.message });
  //   }
  // }

  // ============================================
  //  Actualizar comentario (solo autor)
  // ============================================
  static async actualizarComentario({ comentarioUuid, userUuid, contenido }) {
    const contenidoLimpio = sanitize(contenido ?? "");

    if (!contenidoLimpio.trim()) {
      const error = new Error("El contenido no puede estar vacío");
      error.statusCode = 400;
      throw error;
    }

    // Verificar autor
    const [rows] = await pool.query(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        BIN_TO_UUID(user_id) AS user_id
      FROM comentarios
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [comentarioUuid]
    );

    if (rows.length === 0) {
      const error = new Error("Comentario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const comentario = rows[0];

    if (comentario.user_id !== userUuid) {
      const error = new Error("No tienes permisos para editar este comentario");
      error.statusCode = 403;
      throw error;
    }

    await pool.query(
      `
      UPDATE comentarios
      SET contenido = ?
      WHERE id = UUID_TO_BIN(?)
      `,
      [contenidoLimpio, comentarioUuid]
    );

    // Devolver comentario actualizado
    const [[updated]] = await pool.query(
      `
      SELECT
        BIN_TO_UUID(c.id) AS id,
        c.contenido,
        c.created_at,
        BIN_TO_UUID(c.user_id) AS user_id,
        BIN_TO_UUID(c.publicacion_id) AS publicacion_id
      FROM comentarios c
      WHERE c.id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [comentarioUuid]
    );

    return updated;
  }

  // ============================================
  // Eliminar comentario (solo autor)
  // ============================================
  static async eliminarComentario({ comentarioUuid, userUuid }) {
    const [rows] = await pool.query(
      `
      SELECT
        BIN_TO_UUID(id) AS id,
        BIN_TO_UUID(user_id) AS user_id
      FROM comentarios
      WHERE id = UUID_TO_BIN(?)
      LIMIT 1
      `,
      [comentarioUuid]
    );

    if (rows.length === 0) {
      const error = new Error("Comentario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const comentario = rows[0];

    if (comentario.user_id !== userUuid) {
      const error = new Error(
        "No tienes permisos para eliminar este comentario"
      );
      error.statusCode = 403;
      throw error;
    }

    await pool.query("DELETE FROM comentarios WHERE id = UUID_TO_BIN(?)", [
      comentarioUuid,
    ]);

    return { success: true };
  }
}
