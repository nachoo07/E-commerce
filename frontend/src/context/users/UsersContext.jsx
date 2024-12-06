import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const UsersContext = createContext();

const UsersProvider = ({children}) => {
    const [usuarios, setUsuarios] = useState([]);

    const obtenerUsuarios = async () => {
        try {
            const response = await axios.get("https://e-commerce-adzq.onrender.com/api/users/");
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            Swal.fire("¡Error!", "No se pudieron cargar los usuarios", "error");
        }
    };

    const addUsuarioAdmin = async (usuario) => {
        try {
            usuario.role = 'admin'; // Asignar rol de "admin" por defecto
            const response = await axios.post("https://e-commerce-adzq.onrender.com/api/users/create", usuario);
            setUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);
            Swal.fire("¡Éxito!", "Usuario admin creado correctamente", "success");
        } catch (error) {
            console.error("Error al crear usuario admin:", error);
            Swal.fire("¡Error!", "No se pudo crear el usuario admin", "error");
        }
    };

    const updateUsuarioAdmin = async (id, usuarioActualizado) => {
        try {
            const response = await axios.put(`https://e-commerce-adzq.onrender.com/api/users/${id}`, usuarioActualizado);
            setUsuarios((prevUsuarios) =>
                prevUsuarios.map((usuario) =>
                    usuario._id === id ? response.data : usuario
                )
            );
            Swal.fire("¡Éxito!", "Usuario actualizado correctamente", "success");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            Swal.fire("¡Error!", "No se pudo actualizar el usuario", "error");
        }
    };

    const deleteUsuarioAdmin = async (id) => {
        try {
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción no se puede deshacer",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (confirmacion.isConfirmed) {
                await axios.delete(`https://e-commerce-adzq.onrender.com/api/users/${id}`);
                setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario._id !== id));
                Swal.fire("¡Eliminado!", "Usuario eliminado correctamente", "success");
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            Swal.fire("¡Error!", "No se pudo eliminar el usuario", "error");
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return (
        <UsersContext.Provider value={{
            usuarios,
            addUsuarioAdmin,
            updateUsuarioAdmin,
            deleteUsuarioAdmin,
        }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider;