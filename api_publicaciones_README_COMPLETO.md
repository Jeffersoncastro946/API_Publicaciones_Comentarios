# 📚 Documentación de la API – `api_publicaciones`

API RESTful para gestionar **usuarios**, **autenticación**, **publicaciones** y **comentarios**, sobre **MySQL 8** con **JWT**.

---

## 1. Información general

- **Base URL (local)**: `http://localhost:8180/api`
- **Versión**: `v1`
- **Formato**: JSON (`application/json`)
- **Autenticación**: `JWT Bearer` en el header `Authorization`

Ejemplo de header de autenticación:

```http
Authorization: Bearer <token>
```

---

## 2. Autenticación

### 2.1 Registro de usuario

**Endpoint**: `POST /auth/register`  
**Descripción**: Crea un nuevo usuario en el sistema.

**Headers**

```http
Content-Type: application/json
```

**Body (ejemplo)**

```json
{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "phone": "99887766",
  "password": "12345678"
}
```

**Respuesta 201 (ejemplo)**

```json
{
  "id": "5c8f57c9-c3bd-11f0-9d03-da3f5c10cf47",
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "phone": "99887766",
  "created_at": "2025-11-24T15:00:00.000Z"
}
```

---

### 2.2 Login de usuario

**Endpoint**: `POST /auth/login`  
**Descripción**: Autentica al usuario y devuelve un **token JWT**.

**Headers**

```http
Content-Type: application/json
```

**Body (ejemplo)**

```json
{
  "email": "a@gmail.com",
  "password": "12345678"
}
```

**Respuesta 200 (ejemplo)**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1f459f1b-c947-11f0-b0e7-167deec9f809",
    "name": "Usuario Demo",
    "email": "a@gmail.com"
  }
}
```

Ese `token` debe enviarse en todos los endpoints protegidos:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```

```

---

## 3. Convenciones de respuesta

### 3.1 Respuesta exitosa (recomendada)

```json
{
  "success": true,
  "data": {},
  "message": null
}
```

Ejemplo:

```json
{
  "success": true,
  "data": {
    "id": "4aba4769-c963-11f0-af25-a6afa9236dc4",
    "title": "Publicación #1",
    "description": "Texto de ejemplo",
    "user_id": "5c8f57c9-c3bd-11f0-9d03-da3f5c10cf47",
    "created_at": "2025-11-24T15:00:00.000Z"
  },
  "message": null
}
```

### 3.2 Respuesta de error (recomendada)

```json
{
  "success": false,
  "message": "Publicación no encontrada",
  "code": "NOT_FOUND",
  "errors": null
}
```

---

## 4. Manejo de errores

| HTTP | Código interno   | Descripción                     |
| ---- | ---------------- | ------------------------------- |
| 400  | VALIDATION_ERROR | Datos de entrada inválidos      |
| 401  | UNAUTHORIZED     | Token ausente o inválido        |
| 403  | FORBIDDEN        | Usuario sin permisos            |
| 404  | NOT_FOUND        | Recurso no encontrado           |
| 409  | CONFLICT         | Conflicto (ej. email duplicado) |
| 500  | SERVER_ERROR     | Error interno no controlado     |

---

## 5. Recursos y endpoints

### 5.1 Ruta inicial

#### GET `/api/`

**Descripción**: Endpoint raíz de la API (puede usarse para healthcheck).

**Respuesta 200 (ejemplo)**

```json
{
  "message": "Bienvenido al proyecto de publicaciones y comentarios"
}
```

---

## 5.2 Publicaciones

Recurso principal: `/api/publicaciones`

### 5.2.1 Listar todas las publicaciones

#### GET `/api/publicaciones`

**Descripción**: Obtiene la lista de todas las publicaciones.

**Headers**: Ninguno obligatorio.

**Respuesta 200 (ejemplo)**

```json
[
  {
    "id": "4aba4769-c963-11f0-af25-a6afa9236dc4",
    "title": "Publicación #1",
    "description": "Texto de ejemplo",
    "user_id": "5c8f57c9-c3bd-11f0-9d03-da3f5c10cf47",
    "created_at": "2025-11-24T15:00:00.000Z"
  }
]
```

---

### 5.2.2 Obtener una publicación por ID

#### GET `/api/publicaciones/{id}`

**Descripción**: Obtiene una publicación específica.

**Parámetros de ruta**

- `id` (UUID) – Identificador de la publicación.

**Respuesta 200 (ejemplo)**

```json
{
  "id": "4aba4769-c963-11f0-af25-a6afa9236dc4",
  "title": "Publicación #1",
  "description": "Texto de ejemplo",
  "user_id": "5c8f57c9-c3bd-11f0-9d03-da3f5c10cf47",
  "created_at": "2025-11-24T15:00:00.000Z"
}
```

**Respuesta 404 (ejemplo)**

```json
{
  "success": false,
  "message": "Este recurso no existe",
  "code": 404
}
```

---

### 5.2.3 Crear una nueva publicación

#### POST `/api/publicaciones`

**Descripción**: Crea una nueva publicación para el usuario autenticado.  
**Requiere autenticación JWT.**

**Headers**

```http
Content-Type: application/json
Authorization: Bearer <token>
```

**Body (ejemplo)**

```json
{
  "title": "Publicación #123",
  "description": "Descripción de ejemplo"
}
```

**Respuesta 201 (ejemplo)**

```json
{
  "id": "a6093bc3-c29e-11f0-b0db-6e0506219b55",
  "title": "Publicación #123",
  "description": "Descripción de ejemplo",
  "user_id": "1f459f1b-c947-11f0-b0e7-167deec9f809",
  "created_at": "2025-11-24T15:05:00.000Z"
}
```

---

### 5.2.4 Actualizar una publicación

#### PUT `/api/publicaciones/{id}`

**Descripción**: Modifica una publicación existente.  
**Requiere autenticación JWT.**

**Headers**

```http
Content-Type: application/json
Authorization: Bearer <token>
```

**Body (ejemplo)**

```json
{
  "title": "Publicación actualizada",
  "description": "Contenido actualizado desde la API"
}
```

**Respuesta 200 (ejemplo)**

```json
{
  "id": "4aba4769-c963-11f0-af25-a6afa9236dc4",
  "title": "Publicación actualizada",
  "description": "Contenido actualizado desde la API",
  "user_id": "1f459f1b-c947-11f0-b0e7-167deec9f809",
  "created_at": "2025-11-24T15:00:00.000Z",
  "updated_at": "2025-11-24T16:10:00.000Z"
}
```

---

### 5.2.5 Eliminar una publicación

#### DELETE `/api/publicaciones/{id}`

**Descripción**: Elimina una publicación.  
**Requiere autenticación JWT.**

**Headers**

```http
Authorization: Bearer <token>
```

**Respuesta 200 (ejemplo)**

```json
{
  "success": true,
  "message": "Publicación eliminada correctamente"
}
```

---

## 5.3 Comentarios

### 5.3.1 Listar comentarios de una publicación

#### GET `/api/publicaciones/{publicacionId}/comentarios`

**Descripción**: Obtiene todos los comentarios asociados a una publicación.

**Parámetros de ruta**

- `publicacionId` (UUID) – ID de la publicación.

**Respuesta 200 (ejemplo)**

```json
[
  {
    "id": "2108c26d-9f02-4182-ac1f-f06e89fc94ba",
    "contenido": "Este es el comentario #1",
    "user_id": "5c8f57c9-c3bd-11f0-9d03-da3f5c10cf47",
    "publicacion_id": "4aba4769-c963-11f0-af25-a6afa9236dc4",
    "created_at": "2025-11-24T15:20:00.000Z"
  }
]
```

---

### 5.3.2 Crear un comentario en una publicación

#### POST `/api/publicaciones/{publicacionId}/comentarios`

**Descripción**: Crea un nuevo comentario para una publicación dada.  
**Requiere autenticación JWT.**

**Headers**

```http
Content-Type: application/json
Authorization: Bearer <token>
```

**Body (ejemplo)**

```json
{
  "contenido": "Este es el comentario #2",
  "user_id": "5c8f57c9-c3bd-11f0-9d03-da3f5c10cf47"
}
```

**Respuesta 201 (ejemplo)**

```json
{
  "id": "5dda3ab7-ef1b-441f-b4c1-34b6f1acfd29",
  "contenido": "Este es el comentario #2",
  "user_id": "5c8f57c9-c3bd-11f0-9d03-da3f5c10cf47",
  "publicacion_id": "4aba4769-c963-11f0-af25-a6afa9236dc4",
  "created_at": "2025-11-24T15:25:00.000Z"
}
```

---

### 5.3.3 Actualizar un comentario

#### PUT `/api/comentarios/{comentarioId}`

**Descripción**: Actualiza el contenido de un comentario existente.  
**Requiere autenticación JWT.**

**Headers**

```http
Content-Type: application/json
Authorization: Bearer <token>
```

**Body (ejemplo)**

```json
{
  "contenido": "Este es un comentario actualizado desde la API"
}
```

**Respuesta 200 (ejemplo)**

```json
{
  "id": "2108c26d-9f02-4182-ac1f-f06e89fc94ba",
  "contenido": "Este es un comentario actualizado desde la API",
  "user_id": "5c8f57c9-c3bd-11f0-9d03-da3f5c10cf47",
  "publicacion_id": "4aba4769-c963-11f0-af25-a6afa9236dc4",
  "created_at": "2025-11-24T15:20:00.000Z",
  "updated_at": "2025-11-24T16:00:00.000Z"
}
```

---

### 5.3.4 Eliminar un comentario

#### DELETE `/api/comentarios/{comentarioId}`

**Descripción**: Elimina un comentario por ID.  
**Requiere autenticación JWT.**

**Headers**

```http
Authorization: Bearer <token>
```

**Respuesta 200 (ejemplo)**

```json
{
  "success": true,
  "message": "Comentario eliminado correctamente"
}
```

---

## 6. Modelos de datos (Schemas)

### 6.1 Usuario

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "created_at": "datetime"
}
```

### 6.2 Publicación

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

### 6.3 Comentario

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

## Helpers de codigos

| HTTP | Código interno | Descripción                              |
| ---- | -------------- | ---------------------------------------- |
| 200  | SUCCESS        | La solicitud fue procesada correctamente |
| 400  | Bad request    | request mal hecha                        |
| 500  | SERVER_ERROR   | Error interno del servidor               |
