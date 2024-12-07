import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/login/LoginContext';

const Logout = () => {
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await axios.post('https://e-commerce-adzq.onrender.com/api/auth/logout', {}, {
                withCredentials: true,  // Asegúrate de que las cookies se envíen
            });
            logout();
            alert('Logout exitoso');
            navigate('/login'); // Redirigir a la página de login después del logout
        } catch (error) {
            alert(`Error al cerrar sesión: ${error.message}`);
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Cerrar sesión
        </button>
    );
};

export default Logout;