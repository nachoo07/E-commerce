import Joi from "joi";

// Validación para el registro de usuario
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "string.base": "El nombre debe ser un texto",
    "string.empty": "El nombre es obligatorio",
    "string.min": "El nombre debe tener al menos 3 caracteres",
    "string.max": "El nombre no puede exceder los 100 caracteres",
  }),
  surname: Joi.string().min(3).max(100).required().messages({
    "string.base": "El apellido debe ser un texto",
    "string.empty": "El apellido es obligatorio",
    "string.min": "El apellido debe tener al menos 3 caracteres",
    "string.max": "El apellido no puede exceder los 100 caracteres",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser válido",
    "string.empty": "El email es obligatorio",
  }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.empty": "La contraseña es obligatoria",
    "string.min": "La contraseña debe tener al menos 6 caracteres",
    "string.max": "La contraseña no puede exceder los 100 caracteres",
  }),
});

// Validación para el login de usuario
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "El email debe ser válido",
    "string.empty": "El email es obligatorio",
  }),
  password: Joi.string().required().messages({
    "string.empty": "La contraseña es obligatoria",
  }),
});

// Validación para actualizar usuario
export const updateSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  surname: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).max(100).optional(),
  rol: Joi.string().valid("admin", "usuario").optional(),
}).or("name", "surname", "email", "password", "rol").messages({
  "object.missing": "Debes proporcionar al menos un campo para actualizar",
});