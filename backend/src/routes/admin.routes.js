
import express from 'express';
import userController from '../controllers/user.controller.js';
import { authenticate, authorizeAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para crear un nuevo usuario administrador
router.post('/create', authenticate, authorizeAdmin, userController.createAdminUser);

// Ruta para obtener todos los usuarios administradores
router.get('/admins', authenticate, authorizeAdmin, userController.getAllAdminUsers);

// Ruta para obtener un usuario administrador por ID
router.get('/admins/:id', authenticate, authorizeAdmin, userController.getAdminUserById);

// Ruta para actualizar un usuario administrador existente
router.put('/admins/:id', authenticate, authorizeAdmin, userController.updateAdminUser);

// Ruta para eliminar un usuario administrador
router.delete('/admins/:id', authenticate, authorizeAdmin, userController.deleteAdminUser);

export default router;