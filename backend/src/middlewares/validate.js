
// Middleware de validación
export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: "Validación fallida", errors: errorDetails });
  }

  next(); // Continúa al siguiente middleware/controlador
};