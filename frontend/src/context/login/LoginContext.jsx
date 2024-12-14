import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const role = Cookies.get('authRole');
        if (role) {
            setAuth(role);
        }
    }, []);

    const login = (role) => {
        setAuth(role);
        Cookies.set('authRole', role, { expires: 7 });
    };

    const logout = () => {
        setAuth(null);
        Cookies.remove('authRole', { path: '/' }); // Incluye el path si fue configurado
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};