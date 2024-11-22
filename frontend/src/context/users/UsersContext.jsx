import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const UsersContext = createContext();

const UsersProvider = ({children}) => {
    const [usuarios, setUsuarios] = useState([]);

    const API_URL = "https://e-commerce-adzq.onrender.com"; // Reemplaza con la URL base de tu backend

  // Obtener todos los usuarios
  const obtenerUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/`);
      console.log("Response data:", response.data);  // Verifica la respuesta
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      Swal.fire("¡Error!", "No se pudieron cargar los usuarios", "error");
    }
  };

    // Crear usuario
    const addUsuario = async (usuario) => {
        try {
          const response = await axios.post(`${API_URL}/usuarios/admin`, usuario);
          setUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);
          Swal.fire("¡Éxito!", "Usuario creado correctamente", "success");
        } catch (error) {
          console.error("Error al crear usuario:", error);
          Swal.fire("¡Error!", "No se pudo crear el usuario", "error");
        }
      };


  // Obtener usuario por ID
  const getUsuarioById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      throw error;
    }
  };

    // Actualizar usuario
    const updateUsuario = async (id, usuarioActualizado) => {
        try {
          const response = await axios.put(
            `${API_URL}/usuarios/${id}`,
            usuarioActualizado
          );
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

        // Eliminar usuario
  const deleteUsuario = async (id) => {
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
        await axios.delete(`${API_URL}/usuarios/${id}`);
        setUsuarios((prevUsuarios) => prevUsuarios.filter((usuario) => usuario._id !== id));
        Swal.fire("¡Eliminado!", "Usuario eliminado correctamente", "success");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire("¡Error!", "No se pudo eliminar el usuario", "error");
    }
  };
  // Ejecutar al cargar el componente
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <UsersContext.Provider value={{
        usuarios,
        addUsuario,
        getUsuarioById,
        updateUsuario,
        deleteUsuario,
      }}>
{children}
    </UsersContext.Provider>
  )
}

export default UsersProvider