// api/middlewares/verifyToken.js
import jwt from 'jsonwebtoken'
import { response } from '../utils/response.js'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  console.error('⚠️ No se ha definido JWT_SECRET en el .env')
}

/**
 * Middleware que verifica el token JWT enviado en el header Authorization
 * Formato esperado: Authorization: Bearer <token>
 */
export const verifyToken = (req, res, next) => {
  // Puede venir como "authorization" o "Authorization"
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader) {
    return response.clientError({
      res,
      code: 401,
      message: 'No se envió el token de autenticación'
    })
  }

  const [scheme, token] = authHeader.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return response.clientError({
      res,
      code: 401,
      message: 'Formato de token inválido. Usa: Bearer <token>'
    })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)

    // Guardamos info del usuario autenticado en la request
    req.user = {
      id: payload.id,
      email: payload.email
    }

    return next()
  } catch (err) {
    console.error('Error al verificar token:', err)

    if (err.name === 'TokenExpiredError') {
      return response.clientError({
        res,
        code: 401,
        message: 'El token ha expirado, vuelve a iniciar sesión'
      })
    }

    return response.clientError({
      res,
      code: 401,
      message: 'Token inválido'
    })
  }
}
