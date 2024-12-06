
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://e-commerce-adzq.onrender.com/api/auth/register', formData);
            Swal.fire('¡Éxito!', response.data.message, 'success');
        } catch (error) {
            Swal.fire('¡Error!', error.response.data.message, 'error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Nombre" onChange={handleChange} required />
            <input type="text" name="username" placeholder="Nombre de usuario" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;