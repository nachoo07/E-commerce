import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login/register.css';

const Register = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};
        if (!name) errors.name = 'El nombre es obligatorio';
        if (!username) errors.username = 'El nombre de usuario es obligatorio';
        if (!email) errors.email = 'El email es obligatorio';
        if (!password) errors.password = 'La contraseña es obligatoria';
        return errors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
    
        try {
            const response = await axios.post('https://e-commerce-adzq.onrender.com/api/auth/register', { name, username, email, password }, 
            { withCredentials: true }
            );
            alert(response.data.message);
            navigate('/login'); // Redirigir a la página de login después del registro
        } catch (error) {
            // Verificar si hay errores en el array de errores
            if (error.response?.data?.errors) {
                alert(error.response.data.errors.map(e => e.msg).join(', '));
            } else {
                alert(error.response?.data?.message || 'Error al registrar usuario');
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Registro000000</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {errors.username && <p className="error">{errors.username}</p>}
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
                <button type="submit" className="red-button">Registrarse</button>
            </form>
            <button onClick={() => navigate('/login')} className="login-button">Iniciar sesión</button>
        </div>
    );
};

export default Register;