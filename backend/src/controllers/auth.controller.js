import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';
import { validationResult } from 'express-validator';

// Registro
export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email, password } = req.body; // Eliminado 'role' del body
    try {
        // Verificar si el correo ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use.' });
        }

        // Crear y guardar usuario
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({ 
            name, 
            username, 
            email, 
            password: hashedPassword, 
            role: 'cliente' // Rol predeterminado
        });
        await newUser.save();

        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user.', error });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password.' });

        // Generar token
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });

        // Configurar cookies
        res.cookie('token', token, {
            httpOnly: true, // Solo accesible por el servidor
            secure: process.env.NODE_ENV === 'production', // Requiere HTTPS en producción
            sameSite: 'None', // Asegura compatibilidad entre dominios
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            domain: process.env.NODE_ENV === 'production' ? 'e-commerce-adzq.onrender.com' : 'localhost',
            path: '/', // Define el path explícitamente
        });

        res.cookie('authRole', user.role, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            domain: process.env.NODE_ENV === 'production' ? 'e-commerce-adzq.onrender.com' : 'localhost',
            path: '/', // Define el path explícitamente
        });

        res.cookie('authName', user.name, {
            httpOnly: false, // Puede ser accesible por el cliente para mostrar el nombre
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000, // 1 día
            domain: process.env.NODE_ENV === 'production' ? 'e-commerce-adzq.onrender.com' : 'localhost',
            path: '/', // Define el path explícitamente
        });

        res.status(200).json({ message: 'Login successful', role: user.role, name: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in.', error });
    }
};

export const logout = (req, res) => {
    console.log('Cookies recibidas en el servidor:', req.cookies); // Todas las cookies
    console.log('Token recibido:', req.cookies.token); // La cookie específica

    if (!req.cookies.token) {
        return res.status(400).json({ message: 'No token found in cookies' });
    }

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        domain: process.env.NODE_ENV === 'production' ? '.e-commerce-adzq.onrender.com' : 'localhost',
        path: '/', // Define el path explícitamente
    });

    res.clearCookie('authRole', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        domain: process.env.NODE_ENV === 'production' ? '.e-commerce-adzq.onrender.com' : 'localhost',
        path: '/', // Define el path explícitamente
    });

    res.clearCookie('authName', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None',
        domain: process.env.NODE_ENV === 'production' ? '.e-commerce-adzq.onrender.com' : 'localhost',
        path: '/', // Define el path explícitamente
    });

    console.log('Cookies eliminadas correctamente');
    res.status(200).json({ message: 'User logged out successfully!' });
};

export const updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, email } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).send({ message: 'User not found.' });

        if (name) user.name = name;
        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();
        res.status(200).send({ message: 'Profile updated successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error updating profile.', error });
    }
};