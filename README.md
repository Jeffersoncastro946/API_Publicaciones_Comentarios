# API de Publicaciones y comentarios

## Proyecto desarrollado con Node.js, Express y MySQL que permite gestionar publicaciones y comentarios de usuarios.

## Tabla de contenidos

1. [Características](#características)
2. [Prerequisitos](#prerequisitos)
3. [Instalación](#instalación)
4. [Uso de Endpoints](#uso-de-endpoints)
   - [Raíz](#raíz-de-la-api)
   - [Autenticación](#autenticación)
   - [Publicaciones](#publicaciones)
   - [Comentarios](#comentarios)
5. [Modelos de Datos](#modelos-de-datos)
6. [Códigos de Error](#códigos-de-error)

## Características

- Autenticación con JWT
- Encriptación de contraseñas con Argon2
- Protección contra XSS
- Validación de datos
- Arquitectura MVC
- Base de datos MySQL
- Docker y Docker Compose
- Manejo centralizado de errores

## Prerequisitos

Tener Node.js v21 o superior instalado

```bash
node -v
```

Tener Docker instalado

```bash
docker --version
```

Tener Node Package Manager (npm)

```bash
npm -v
```

Tener Git instalado

```bash
git --version
```

## Instalación

1-Clonar el repositorio y navegar al directorio del proyecto

```bash
git clone https://github.com/Jeffersoncastro946/API_Publicaciones_Comentarios.git
```

---

## 2. Crear archivo `.env`

en la raíz del proyecto con las variables que se encuentran en el archivo `.env.example` y ajustarlas según tu configuración local.

## 3. Levantar MySQL con Docker

Entrar a la carpeta de `mysql-docker` y ejecutar Docker Compose para levantar el contenedor de MySQL

```bash
cd mysql-docker
docker-compose up -d
```

---

## 4. Instalar dependencias

Volver a la raíz del proyecto e instalar las dependencias

```bash
cd ..
npm install
```

---

## 5. Iniciar servidor

```bash
npm run dev
```

---

## 6. URL base

La API estará disponible en `http://localhost:{PUERTO}/api/`

## Uso de endpoints

## Raíz de la API

`GET /api/`: Endpoint raíz de la API con la bienvenida al proyecto (no requiere autenticación).

## Autenticación

### Registro de usuario

`POST /auth/register`: Registra un nuevo usuario (no requiere autenticación).

````json
Content-Type: application/json

{
"name": ,
"email": ,
"phone": ,
"password":
}```

````

---

## Login de Usuario

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "juan@example.com",
  "password": "12345678"
}
```

Token:

```http
Authorization: Bearer <token>
```

---

## Publicaciones

---

## Crear publicación

```http
POST /api/publicaciones
Authorization: Bearer {token}
Content-Type: application/json
```

```json
{
  "title": "Nueva publicación",
  "description": "Contenido..."
}
```

## Listar Publicaciones (con soporte para búsqueda)

```http
GET /api/publicaciones
```

## Buscar publicaciones por palabra clave

```http
GET /api/publicaciones?q={palabraClave}
```

Descripción:
Permite buscar publicaciones cuyo título o descripción contenga la palabra clave especificada.

| Parámetro | Tipo   | Obligatorio | Descripción                                           |
| --------- | ------ | ----------- | ----------------------------------------------------- |
| `q`       | string | No          | Palabra clave para buscar en `title` y `description`. |

## Obtener por ID

```http
GET /api/publicaciones/{id}
```

## Actualizar

```http
PUT /api/publicaciones/{id}
Authorization: Bearer {token}
```

## Eliminar

```http
DELETE /api/publicaciones/{id}
Authorization: Bearer {token}
```

---

## Comentarios

Se agregaron endPoint adicionales para comentarios de esa manera el dia de mañana se ocupran ya estaran listos

## Listar

```http
GET /api/publicaciones/{id}/comentarios
```

## Crear

```http
POST /api/publicaciones/{id}/comentarios
Authorization: Bearer {token}
Content-Type: application/json
```

## Actualizar

```http
PUT /api/comentarios/{id}
Authorization: Bearer {token}
```

## Eliminar

```http
DELETE /api/comentarios/{id}
Authorization: Bearer {token}
```

## Modelos de Datos

## Usuario

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "created_at": "datetime"
}
```

## Publicación

```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "user_id": "uuid",
  "created_at": "datetime",
  "updated_at": "datetime|null"
}
```

## Comentario

```json
{
  "id": "uuid",
  "contenido": "string",
  "user_id": "uuid",
  "publicacion_id": "uuid",
  "created_at": "datetime",
  "updated_at": "datetime|null"
}
```

---

## Códigos de Error

```
400 VALIDATION_ERROR
401 UNAUTHORIZED
403 FORBIDDEN
404 NOT_FOUND
409 CONFLICT
500 SERVER_ERROR
```
