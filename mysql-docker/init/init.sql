

-- Eliminar tablas si existieran (útil para desarrollo)
DROP TABLE IF EXISTS publicaciones;
DROP TABLE IF EXISTS comentarios;
DROP TABLE IF EXISTS usuarios;

-- Crear tabla de usuarios con UUID en BINARY(16)
CREATE TABLE usuarios (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de publicaciones
CREATE TABLE publicaciones (
  id BINARY(16) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_id BINARY(16),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Crear tabla de comentarios
CREATE TABLE comentarios (
  id BINARY(16) PRIMARY KEY,
  contenido TEXT NOT NULL,
  user_id BINARY(16) NOT NULL,
  publicacion_id BINARY(16) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_comentarios_usuarios
    FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  CONSTRAINT fk_comentarios_publicaciones
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Insertar usuario de ejemplo
SET @user_bin_id = UUID_TO_BIN(UUID());

INSERT INTO usuarios (id, name, email, phone, password_hash)
VALUES (@user_bin_id,
  'Andres Leiva',
  'andres.leiva@unah.hn',
  '+50499999999',
  '1234'
);

INSERT INTO usuarios (id, name, email, phone, password_hash)
VALUES (@user_bin_id2,
  'Jefferson Castro',
  'jefferson.castro@unah.hn',
  '94331368',
  '1234'  -- TODO: usa hash real (bcrypt/argon2) en producción
);

-- ==========================
--  Publicación de ejemplo
-- ==========================
SET @pub_bin_id = UUID_TO_BIN(UUID());

INSERT INTO publicaciones (id, title, description, user_id)
VALUES (
  @pub_bin_id,
  'Primera publicación de ejemplo',
  'Esta es una publicación inicial para probar el módulo de comentarios.',
  @user_bin_id -- autor: Andrés
);

-- ==========================
--  Comentario de ejemplo
-- ==========================
INSERT INTO comentarios (id, contenido, user_id, publicacion_id)
VALUES (
  UUID_TO_BIN(UUID()),
  'Este es un comentario de prueba en la publicación de ejemplo.',
  @user_bin_id2, -- Jefferson comenta
  @pub_bin_id
);