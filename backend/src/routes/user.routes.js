import express from 'express';
import userController from '../controllers/user.controller.js';
const router = express.Router();


// Ruta para obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Ruta para obtener un usuario por ID
router.get('/:id', userController.getUserById);

// Ruta para crear un nuevo usuario
router.post('/', userController.createUser);

// Ruta para actualizar un usuario existente
router.put('/:id', userController.updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', userController.deleteUser);

export default router;

