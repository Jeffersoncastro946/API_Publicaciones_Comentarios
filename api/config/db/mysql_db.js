import {createPool} from "mysql2/promise"
import {env} from "node:process";

if(!env) throw new Error("Ocurrió un error al cargar las variables de entorno para la DB");

const mysqlPool = createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    namedPlaceholders:true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default mysqlPool
