DROP TABLE IF EXISTS comentarios;
DROP TABLE IF EXISTS publicaciones;
DROP TABLE IF EXISTS users;

-- Tabla users (coincide con tu UsersService + Auth)
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla publicaciones
CREATE TABLE publicaciones (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  user_id CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla comentarios
CREATE TABLE comentarios (
  id CHAR(36) PRIMARY KEY,
  contenido TEXT NOT NULL,
  user_id CHAR(36) NOT NULL,
  publicacion_id CHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id)
);

-- OPCIONAL: insertar datos de ejemplo
INSERT INTO users (id, name, email, phone, password_hash)
VALUES (
  UUID(),
  'Andres Leiva',
  'andres.leiva@unah.hn',
  '+50499999999',
  '$argon2id$v=19$m=65536,t=3,p=4$xxxxxxxxxxxx' -- reemplazar por hash real si quieren
);

INSERT INTO users (id, name, email, phone, password_hash)
VALUES (
  UUID(),
  'Jefferson Castro',
  'jefferson.castro@unah.hn',
  '94331368',
  '$argon2id$v=19$m=65536,t=3,p=4$xxxxxxxxxxxx'
);

INSERT INTO publicaciones (id, title, description, user_id)
VALUES (
  UUID(),
  'Publicación de ejemplo',
  'Esta es una publicación inicial.',
  (SELECT id FROM users LIMIT 1)
);

INSERT INTO comentarios (id, contenido, user_id, publicacion_id)
VALUES (
  UUID(),
  'Comentario de ejemplo.',
  (SELECT id FROM users LIMIT 1 OFFSET 1),
  (SELECT id FROM publicaciones LIMIT 1)
);
