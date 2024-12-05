import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../usuariosAdmin/UsersAdmin.css'

const UserFormAdmin = ({ usuario, handleClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "Cliente", // Valor por defecto, puede cambiarse si se requiere
    });

    useEffect(() => {
        if (usuario) {
            setFormData(usuario); // Carga datos del usuario si se está editando
        } else {
            setFormData({
                email: "",
                password: "",
                role: "Cliente",
            });
        }
    }, [usuario]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Enviar los datos al método `onSubmit`
        handleClose(); // Cerrar el modal/formulario tras enviar
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Correo electrónico"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Contraseña"
                    minLength={6}
                    required
                />
                <Form.Text>Debe tener al menos 6 caracteres.</Form.Text>
            </Form.Group>

            {/* Campo de rol visible solo si es necesario modificar el rol */}
            {usuario && (
                <Form.Group className="mb-3">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="Cliente">Cliente</option>
                        <option value="Admin">Admin</option>
                    </Form.Select>
                </Form.Group>
            )}

            <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button type="submit" variant="primary">
                    {usuario ? "Actualizar Usuario" : "Agregar Usuario"}
                </Button>
            </div>
        </Form>
    );
};

export default UserFormAdmin;