import UserAdmin from '../models/userAdmin.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los usuarios administradores
const getAllAdminUsers = async (req, res) => {
    try {
        const users = await UserAdmin.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario administrador por ID
const getAdminUserById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    try {
        const user = await UserAdmin.findById(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo usuario con rol de administrador por defecto
const createAdminUser = async (req, res) => {
    const userAdmin = new UserAdmin({
        ...req.body,
        role: 'admin' // Asignar rol de "admin" por defecto
    });
    try {
        const newUserAdmin = await userAdmin.save();
        res.status(201).json(newUserAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un usuario existente
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un usuario administrador existente
const updateAdminUser = async (req, res) => {
    try {
        const updatedUser = await UserAdmin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un usuario administrador
const deleteAdminUser = async (req, res) => {
    try {
        const user = await UserAdmin.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getAllUsers,
    getUserById,
    getAllAdminUsers,
    getAdminUserById,
    createAdminUser,
    updateUser,
    updateAdminUser,
    deleteUser,
    deleteAdminUser
};
