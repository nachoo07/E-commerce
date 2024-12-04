import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

// Registro
export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'El email ya está registrado' });

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario con rol "user" por defecto
        const newUser = new User({ name, username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Credenciales incorrectas' });

        // Generar token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar token en una cookie
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
        res.status(200).json({ message: 'Login exitoso', role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout
export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout exitoso' });
};