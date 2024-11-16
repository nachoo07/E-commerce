import express from "express";
import { RegisterUser, LoginUser, LogoutUser } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/user.validator.js";

const router = express.Router();

// Rutas públicas
router.post("/users/register", validate(registerSchema), RegisterUser);
router.post("/users/login", validate(loginSchema), LoginUser);
router.get("/users/logout", LogoutUser);

export default router;