import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); // Guarda el rol del usuario
    const [userData, setUserData] = useState(null); // Guarda el nombre del usuario
    const domain = process.env.NODE_ENV === 'production' ? '.e-commerce-adzq.onrender.com' : 'localhost';

    useEffect(() => {
        const role = Cookies.get('authRole');
        const name = Cookies.get('authName');
        if (role) setAuth(role);
        if (name) setUserData({ name });
    }, []);

    const login = (role, name) => {
        setAuth(role);
        setUserData({ name }); // Guarda el nombre del usuario
        Cookies.set('authRole', role, { expires: 7, path: '/', domain });
        Cookies.set('authName', name, { expires: 7, path: '/', domain });
    };

    const logout = () => {
        setAuth(null);
        setUserData(null); // Limpia el nombre del usuario al hacer logout
        Cookies.remove('authRole', { path: '/' });
        Cookies.remove('authName', { path: '/' }); // Elimina el nombre de las cookies
    };

    return (
        <AuthContext.Provider value={{ auth, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};