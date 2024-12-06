import express from 'express';
import userController from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', authenticate, userController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', authenticate, userController.getUserById);

// Ruta para actualizar un usuario existente
router.put('/:id', authenticate, userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', authenticate, userController.deleteUser);

export default router;

