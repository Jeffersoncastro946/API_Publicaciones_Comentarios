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

-- Insertar usuario de ejemplo
SET @user_bin_id = UUID_TO_BIN(UUID());

INSERT INTO usuarios (id, name, email, phone, password_hash)
VALUES (@user_bin_id,
  'Andres Leiva',
  'andres.leiva@unah.hn',
  '+50499999999',
  '1234'
);

