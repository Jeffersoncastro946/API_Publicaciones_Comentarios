// api/controllers/auth.controller.js
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import UsersService from "../services/users.service.js";
import { userRegisterModel, userLoginModel } from "../models/user.model.js";
import { response } from "../utils/response.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("No se ha definido JWT_SECRET en el .env");
}

export const register = async (req, res) => {
  const { success, error, data } = userRegisterModel.safeParse(req.body);

  if (!success) {
    return response.clientError({
      res,
      code: 400,
      message: error.issues
    });
  }

  const { name, email, phone, password } = data;

  try {
    const userExists = await UsersService.findByEmail(email);

    if (userExists) {
      return response.clientError({
        res,
        code: 409,
        message: "Ya existe un usuario con ese correo"
      });
    }

    const password_hash = await argon2.hash(password);

    await UsersService.createUser({
      name,
      email,
      phone: phone ?? null,
      password_hash
    });

    return response.success({
      res,
      code: 201,
      message: "Usuario registrado correctamente"
    });
  } catch (e) {
    console.error("Error en register:", e);
    return response.serverError({
      res,
      message: "Error al registrar el usuario"
    });
  }
};

export const login = async (req, res) => {
  const { success, error, data } = userLoginModel.safeParse(req.body);

  if (!success) {
    return response.clientError({
      res,
      code: 400,
      message: error.issues
    });
  }

  const { email, password } = data;

  try {
    const user = await UsersService.findByEmail(email);

    if (!user) {
      return response.clientError({
        res,
        code: 401,
        message: "Credenciales inválidas"
      });
    }

    const isValid = await argon2.verify(user.password_hash, password);

    if (!isValid) {
      return response.clientError({
        res,
        code: 401,
        message: "Credenciales inválidas"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    return response.success({
      res,
      message: "Inicio de sesión correcto",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      }
    });
  } catch (e) {
    console.error("Error en login:", e);
    return response.serverError({
      res,
      message: "Error al iniciar sesión"
    });
  }
};
