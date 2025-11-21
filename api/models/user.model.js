import { z } from 'zod'
export const userRegisterModel = z.object({
  name: z
    .string({
      required_error: 'El nombre es obligatorio'
    })
    .min(3, 'El nombre debe tener al menos 3 caracteres'),

  email: z
    .string({
      required_error: 'El correo es obligatorio'
    })
    .email('El correo no es válido'),

  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 caracteres')
    .max(20, 'El teléfono es muy largo')
    .optional()
    .nullable(),

  password: z
    .string({
      required_error: 'La contraseña es obligatoria'
    })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
})

export const userLoginModel = z.object({
  email: z
    .string({
      required_error: 'El correo es obligatorio'
    })
    .email('El correo no es válido'),

  password: z
    .string({
      required_error: 'La contraseña es obligatoria'
    })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
})
