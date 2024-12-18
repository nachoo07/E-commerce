import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../login/LoginContext"; // Asegúrate de ajustar la ruta

export const UsersContext = createContext();

const UsersProvider = ({children}) => {
    const { auth } = useContext(AuthContext);  // Obtén el estado de autenticación
    const [usuarios, setUsuarios] = useState([]);

    const obtenerUsuarios = async () => {
        if (auth === 'admin') { // Verifica si el usuario es admin
            try {
                const response = await axios.get("https://e-commerce-adzq.onrender.com/api/users/", {
                    withCredentials: true,
                });
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al obtener admins:", error);
                Swal.fire("¡Error!", "No se pudieron cargar los admins", "error");
            }
        }
    };

    const addUsuarioAdmin = async (usuario) => {
        if (auth === 'admin') { // Verifica si el usuario es admin
            try {
                const response = await axios.post("https://e-commerce-adzq.onrender.com/api/users/admin", usuario, {
                    withCredentials: true,
                });
                setUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);
                Swal.fire("¡Éxito!", "Usuario admin creado correctamente", "success");
            } catch (error) {
                console.error("Error al crear usuario admin:", error);
                Swal.fire("¡Error!", "No se pudo crear el usuario admin", "error");
            }
        }
    };

    const updateUsuarioAdmin = async (id, usuarioActualizado) => {
        if (auth === 'admin') { // Verifica si el usuario es admin
            try {
                const response = await axios.put(`https://e-commerce-adzq.onrender.com/api/users/admin/${id}`, usuarioActualizado, {
                    withCredentials: true,
                });
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
        }
    };

    const deleteUsuarioAdmin = async (id) => {
        if (auth === 'admin') { // Verifica si el usuario es admin
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
                    await axios.delete(`https://e-commerce-adzq.onrender.com/api/users/admin/${id}`, {
                        withCredentials: true,
                    });
                    setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario._id !== id));
                    Swal.fire("¡Eliminado!", "Usuario eliminado correctamente", "success");
                }
            } catch (error) {
                console.error("Error al eliminar usuario:", error);
                Swal.fire("¡Error!", "No se pudo eliminar el usuario", "error");
            }
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, [auth]); // Dependiendo de `auth`, vuelve a ejecutar `obtenerUsuarios` cuando el usuario cambie

    return (
        <UsersContext.Provider value={{
            usuarios,
            obtenerUsuarios,
            addUsuarioAdmin,
            updateUsuarioAdmin,
            deleteUsuarioAdmin,
        }}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersProvider;