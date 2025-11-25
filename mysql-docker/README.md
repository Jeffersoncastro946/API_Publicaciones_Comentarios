# ✅ Proyecto - `api_publicaciones`

Este proyecto configura un contenedor de **MySQL 8** usando Docker e incluye un script de inicialización con tablas para **publicaciones** y **comentarios** con **Autenticaciones** , pensado para la elaboración de un **API RESTful**.

---

## 🚀 Instrucciones para iniciar

### 1. Requisitos

Asegúrate de tener instalado:

- [Docker](https://www.docker.com/)

### 2. Levantar el contenedor

Desde la raíz del proyecto donde se encuentra el archivo `docker-compose.yml`, ejecuta:

```bash
docker compose up -d
```

Esto iniciará un contenedor MySQL con:

- Base de datos inicial: `publicaciones_db`
- Tablas configuradas correctamente

---

## 🔐 Datos de conexión

Conéctate a la base de datos desde tu API, Workbench o cualquier cliente MySQL:

| Parámetro       | Valor                     |
| --------------- | ------------------------- |
| Host            | `localhost` o `127.0.0.1` |
| Puerto          | `3310`                    |
| Base de datos   | `publicaciones_mysql`     |
| Usuario         | `unah`                    |
| Contraseña      | `unah1234`                |
| Usuario root    | `root`                    |
| Contraseña root | `unah1234`                |

> ⚠️ El puerto `3310` se mantiene para evitar conflictos con instalaciones locales de MySQL.

> 🛡 Conexión desde clientes (DBeaver, Workbench, JDBC)

---

Si obtienes el error
`Public Key Retrieval is not allowed`
Solución (obligatorio añadir):

En DBeaver → Driver Properties:
| Parámetro | Valor |
| ------------------------| ------------- |
| useSSL | true |
| allowPublicKeyRetrieval | true |

---

## 🗂 Estructura del proyecto

```
.
├── docker-compose.yml         # Configuración de servicios Docker
├── init/
│   └── init.sql               # Script SQL para crear
├── README.md
```

---

# 🧱 Tablas creadas automáticamente

## Tabla `usuarios`

id (BINARY16), name, email, phone, password_hash, created_at

## Tabla `publicaciones`

id, title, description, user_id, created_at

## Tabla `comentarios`

id, contenido, user_id, publicacion_id, created_at

---

# 📥 Datos de ejemplo incluidos

Usuarios: Andres y Jefferson  
Publicación: "Primera publicación de ejemplo"  
Comentario: Jefferson comenta a Andres

---

# 📌 Consultas SQL útiles

```sql
SELECT BIN_TO_UUID(p.id) AS publicacion_id, p.title
FROM publicaciones p;
```

---

# 🧰 Node.js / Express

```js
const pool = createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  namedPlaceholders: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
```

---

# ✔ Proyecto listo
