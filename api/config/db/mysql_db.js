import { createPool } from 'mysql2/promise'
import { loadEnvFile } from 'node:process'

loadEnvFile()

if (!process.env.MYSQL_HOST) {
  throw new Error('❌ Error: No se pudo cargar el .env para la DB')
}

const pool = createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  namedPlaceholders: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export { pool }

export default pool
