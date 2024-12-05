import React, { useState } from 'react';
import axios from 'axios';
import  {useNavigate}  from 'react-router-dom';
import '../login/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

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
            const response = await axios.post('https://e-commerce-adzq.onrender.com/api/auth/login', { email, password });
            alert(response.data.message);
            navigate('/'); // Redirigir a la página principal después del login
        } catch (error) {
            alert(error.response.data.message);
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