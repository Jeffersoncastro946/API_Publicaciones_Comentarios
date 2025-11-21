import { pool } from '../config/db/mysql_db.js'

class UsersService {
  static async findByEmail (email) {
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, password_hash
       FROM users
       WHERE email = ?`,
      [email]
    )

    if (rows.length === 0) return null
    return rows[0]
  }

  static async createUser ({ name, email, phone, password_hash }) {
    await pool.query(
      `INSERT INTO users (name, email, phone, password_hash)
       VALUES (?, ?, ?, ?)`,
      [name, email, phone, password_hash]
    )
  }

  static async findById (id) {
    const [rows] = await pool.query(
      `SELECT id, name, email, phone, password_hash
       FROM users
       WHERE id = ?`,
      [id]
    )

    if (rows.length === 0) return null
    return rows[0]
  }
}

export default UsersService
