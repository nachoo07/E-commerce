import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/login/LoginContext';
import { UsersContext } from '../../context/users/UsersContext';
import '../login/login.css';

const Login = () => {
    const { obtenerUsuarios } = useContext(UsersContext); // Importa obtenerUsuarios del contexto
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();
    const  {login}  = useContext(AuthContext);
    

    const validate = () => {
        const errors = {};
        if (!email) errors.email = 'El email es obligatorio';
        if (!password) errors.password = 'La contraseña es obligatoria';
        return errors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        try {
            const response = await axios.post(
                'https://e-commerce-adzq.onrender.com/api/auth/login', 
                { email, password }, 
                { withCredentials: true }
            );
            console.log('Response:', response);  // Verifica la respuesta completa del servidor
            
            if (response.data && response.data.message === 'Login successful') {
                const role = response.data.role;
    
                // Guarda el rol en el contexto y en localStorage
                login(role);
                localStorage.setItem('authRole', role);
    
                if (role === 'admin') {
                    // Carga los usuarios si el rol es admin
                    await obtenerUsuarios(); // Asegúrate de que obtenerUsuarios esté disponible
                }
    
                alert('Login exitoso');
                navigate('/'); // Redirigir a la página principal
            } else {
                alert('Error en la respuesta del servidor');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                console.error(error);  // Mostrar el error completo en la consola
                alert('Error al iniciar sesión');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <p className="error">{errors.email}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <p className="error">{errors.password}</p>}
                <button type="submit" className="red-button">Iniciar sesión</button>
            </form>
            <button onClick={() => navigate('/register')} className="register-button">Registrarse</button>
        </div>
    );
};

export default Login;