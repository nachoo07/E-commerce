import { Router } from 'express';
import {
    getAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
} from '../controllers/user.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, isAdmin, getAdmins); // Obtener todos los admins
router.post('/admin', verifyToken, isAdmin, createAdmin); // Crear admin
router.put('/admin/:id', verifyToken, isAdmin, updateAdmin); // Actualizar admin
router.delete('/admin/:id', verifyToken, isAdmin, deleteAdmin); // Eliminar admin

export default router;