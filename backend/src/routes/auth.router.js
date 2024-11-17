import express from "express";
import { RegisterUser, LoginUser, LogoutUser } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validations/validationSchemas.js"

const router = express.Router();

// Rutas públicas
router.post("/users/register", validate(registerSchema), RegisterUser);
router.post("/users/login", validate(loginSchema), LoginUser);
router.get("/users/logout", LogoutUser);


export default router;


