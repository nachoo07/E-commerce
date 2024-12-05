import { Router } from 'express';
import { check } from 'express-validator';
import { register, login, logout } from '../controllers/auth.controller.js';
import { rateLimiter } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', rateLimiter, [
    check('name').notEmpty().withMessage('El nombre es obligatorio'),
    check('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    check('email').isEmail().withMessage('Debe ser un email válido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], register);

router.post('/login', rateLimiter, [
    check('email').isEmail().withMessage('Debe ser un email válido'),
    check('password').notEmpty().withMessage('La contraseña es obligatoria')
], login);

router.post('/logout', logout);

export default router;