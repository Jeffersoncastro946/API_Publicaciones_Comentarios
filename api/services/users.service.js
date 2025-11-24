// api/services/users.service.js
import { pool } from '../config/db/mysql_db.js';

class UsersService {
  // Buscar usuario por email (id convertido a UUID texto)
  static async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT 
         BIN_TO_UUID(id) AS id,
         name,
         email,
         phone,
         password_hash
       FROM usuarios
       WHERE email = ?`,
      [email]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  // Crear nuevo usuario
  // Guarda el id como BINARY(16) (UUID_TO_BIN)
  // y regresa el usuario con id en formato UUID string
  static async createUser({ name, email, phone, password_hash }) {
    await pool.query(
      `INSERT INTO usuarios (id, name, email, phone, password_hash)
       VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?)`,
      [name, email, phone ?? null, password_hash]
    );

    // Devolver el usuario recién creado (ya con BIN_TO_UUID en findByEmail)
    const createdUser = await this.findByEmail(email);
    return createdUser;
  }

  // Buscar usuario por ID (id en formato UUID texto)
  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT 
         BIN_TO_UUID(id) AS id,
         name,
         email,
         phone,
         password_hash
       FROM usuarios
       WHERE id = UUID_TO_BIN(?)`,
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  }
}

export default UsersService;
