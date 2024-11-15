// middlewares/restrictTo.js

export const restrictTo = (role) => (req, res, next) => {
    if (req.user.rol !== role) {
      return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
    }
    next();
  };