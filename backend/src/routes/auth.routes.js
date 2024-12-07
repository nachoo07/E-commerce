import { Router } from 'express';
import { register, login, logout, updateProfile } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { check } from 'express-validator';

const router = Router();

router.post('/register', [
    check('name').notEmpty().withMessage('Name is required'),
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], register);

router.post('/login', [
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').notEmpty().withMessage('Password is required')
], login);

router.post('/logout', verifyToken, logout);

router.put('/profile', verifyToken, [
    check('name').optional().notEmpty().withMessage('Name is required'),
    check('username').optional().notEmpty().withMessage('Username is required'),
    check('email').optional().isEmail().withMessage('Valid email is required')
], updateProfile);

export default router;
