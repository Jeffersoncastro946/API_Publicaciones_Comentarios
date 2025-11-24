import { pool } from '../config/db/mysql_db.js';

class UsersService {
  
  // Buscar usuario por email
  static async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, password_hash
       FROM users
       WHERE email = ?`,
      [email]
    );

    return rows.length > 0 ? rows[0] : null;
  }

  // Crear nuevo usuario
  static async createUser({ name, email, phone, password_hash }) {
    await pool.query(
      `INSERT INTO users (name, email, phone, password_hash)
       VALUES (?, ?, ?, ?)`,
      [name, email, phone ?? null, password_hash]
    );
  }

  // Buscar usuario por ID
  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, password_hash
       FROM users
       WHERE id = ?`,
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  }
}

export default UsersService;
