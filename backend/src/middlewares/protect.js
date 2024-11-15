import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No has iniciado sesión" });
  }

  try {
    const decoded = jwt.verify(token, "SECRET_KEY"); // Asegúrate de usar la misma clave secreta
    req.user = decoded; // Guardas la información del usuario en req.user
    next(); // Continúa con la siguiente función (controlador)
  } catch (error) {
    res.status(401).json({ message: "Token no válido o expirado" });
  }
};