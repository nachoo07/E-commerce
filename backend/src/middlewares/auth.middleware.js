import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';

export const verifyToken = (req, res, next) => {
    // Cambié la forma en que obtenemos el token
    const token = req.cookies.token;  // Leer desde las cookies
    console.log('Token recibido:', token); 
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

export const isAdmin = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return res.status(403).send({ message: 'Require Admin Role!' });
    }
    next();
};