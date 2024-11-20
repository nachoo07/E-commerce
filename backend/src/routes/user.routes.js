import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';

const router = express.Router();

// Rutas CRUD
router.post('/register', createUser); // Crear usuario
router.get('/user', getAllUsers); // Obtener todos los usuarios
router.get('/:id', getUserById); // Obtener usuario por ID
router.put('/:id', updateUser); // Actualizar usuario
router.delete('/:id', deleteUser); // Eliminar usuario

export default router;