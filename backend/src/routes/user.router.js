import express from "express";
import { CreateUser, DeleteUser, GetAllUsers, GetUserById, UpdateUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/protect.js";
import { restrictTo } from "../middlewares/restrictTo.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, updateSchema } from "../validators/user.validator.js";

const router = express.Router();

// Rutas protegidas (solo administradores)
router.post("/users", protect, restrictTo("admin"), validate(registerSchema), CreateUser);
router.get("/users", protect, restrictTo("admin"), GetAllUsers);
router.delete("/users/:id", protect, restrictTo("admin"), DeleteUser);

// Rutas protegidas (usuarios autenticados)
router.get("/users/:id", protect, GetUserById);
router.put("/users/:id", protect, validate(updateSchema), UpdateUser);

export default router;


