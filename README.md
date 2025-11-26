# API de Publicaciones y comentarios
Proyecto desarrollado con Node.js, Express y MySQL que permite gestionar publicaciones y comentarios de usuarios.
---

## Tabla de contenidos
[1-Características](#características)

[2-Prerequisitos](#prerequisitos)

[3-Instalación](#instalación)
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

2-Crear un archivo `.env` en la raíz del proyecto con las variables que se encuentran en el archivo `.env.example` y ajustarlas según tu configuración local.
---
3-Entrar a la carpeta de `mysql-docker` y ejecutar Docker Compose para levantar el contenedor de MySQL

```bash
cd mysql-docker
docker-compose up -d
```
---
4-Volver a la raíz del proyecto e instalar las dependencias

```bash
cd ..
npm install
```
---
5-Iniciar el servidor
```bash
npm run dev
```
---
6-La API estará disponible en `http://localhost:{PUERTO}/api/`

## Uso de endpoints
## Raíz de la API

`GET /api/`: Endpoint raíz de la API con la bienvenida al proyecto (no requiere autenticación).
## Autenticación
### Registro de usuario
`POST /auth/register`: Registra un nuevo usuario (no requiere autenticación).

```json
Content-Type: application/json

{
"name": ,
"email": ,
"phone": ,
"password":
}```

 
