import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

export const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Acceso no autorizado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: Solo para administradores' });
    }
    next();
};

export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de 100 solicitudes por IP
    message: 'Demasiadas solicitudes, por favor intente de nuevo más tarde.'
});