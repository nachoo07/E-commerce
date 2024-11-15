import express from "express";
import { CreateUser, DeleteUser, GetAllUsers, GetUserById, UpdateUser, LoginUser, RegisterUser, LogoutUser } from "../controllers/user.controllers.js";
import { protect } from "../middlewares/protect.js";
import { restrictTo } from "../middlewares/restrictTo.js";

const router = express.Router();


// Rutas públicas
router.post("/users/register", RegisterUser); // Registro público de usuarios
router.post("/users/login", LoginUser); // Login público
router.get("/users/logout", LogoutUser); // Logout

// Rutas protegidas (solo administradores)
router.post("/users", protect, restrictTo("admin"), CreateUser); // Solo admin puede crear usuarios
router.get("/users", protect, restrictTo("admin"), GetAllUsers); // Solo admin puede ver todos los usuarios
router.delete("/users/:id", protect, restrictTo("admin"), DeleteUser); // Solo admin puede eliminar usuarios

// Rutas protegidas (usuarios autenticados)
router.get("/users/:id", protect, GetUserById); // Usuarios autenticados pueden ver su perfil
router.put("/users/:id", protect, UpdateUser); // Usuarios autenticados pueden actualizar sus datos



export default router;






