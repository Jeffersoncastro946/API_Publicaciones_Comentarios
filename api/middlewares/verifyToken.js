// api/middlewares/verifyToken.js
import jwt from 'jsonwebtoken';
import { response } from '../utils/response.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("No se ha definido JWT_SECRET en el archivo .env");
}

export const verifyToken = (req, res, next) => {
  // El token puede venir como "authorization" o "Authorization"
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // No se envió ningún token
  if (!authHeader) {
    return response.clientError({
      res,
      code: 401,
      message: "No se envió el token de autenticación"
    });
  }

  // Aseguramos que sea string antes de dividir
  const headerString = String(authHeader).trim();
  const [scheme, token] = headerString.split(" ");

  // El formato debe ser: Bearer <token>
  if (scheme !== "Bearer" || !token) {
    return response.clientError({
      res,
      code: 401,
      message: "Formato de token inválido. Usa: Bearer <token>"
    });
  }

  try {
    // Verificar firma y expiración
    const payload = jwt.verify(token, JWT_SECRET);

    // Guardamos los datos del usuario autenticado
    req.user = {
      id: payload.id,
      email: payload.email
    };

    return next();
  } catch (err) {
    console.error("Error al verificar token:", err);

    // Token expirado
    if (err.name === "TokenExpiredError") {
      return response.clientError({
        res,
        code: 401,
        message: "El token ha expirado, vuelve a iniciar sesión"
      });
    }

    // Token inválido o alterado
    return response.clientError({
      res,
      code: 401,
      message: "Token inválido"
    });
  }
};
