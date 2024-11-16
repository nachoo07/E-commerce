import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const ProductsContext = createContext();

console.log("Lista de productos:", ProductsContext);

const ProductsProvider = ({ children }) => {

  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("https://e-commerce-adzq.onrender.com/");
      console.log("Response data:", response.data);  // Verifica la respuesta
      setProductos(response.data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  const addProducto = async (producto) => {
    try {
      const response = await axios.post("https://e-commerce-adzq.onrender.com/create", producto);
      console.log("Response data:", response.data);
      setProductos((prevProductos) => [...prevProductos, response.data]);  // Usamos la actualización basada en el estado anterior
      Swal.fire("¡Éxito!", "El producto ha sido creado correctamente", "success");
      obtenerProductos();  // No es necesario volver a obtener los productos después de añadir uno nuevo
    } catch (error) {
      console.error("Error al crear el producto:", error);
      Swal.fire("¡Error!", "Ha ocurrido un error al crear el producto", "error");
    }
  };

  const getCategoria = async (category) => {
    try {
      const response = await axios.get(`https://e-commerce-adzq.onrender.com/?category=${category}`);
      console.log("Productos por categoría:", response.data);
      setProductos(response.data);  // Asegúrate de no sobrescribir todo el estado si no es necesario
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
    }
  };

  const deleteProductos = async (id) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro que desea eliminar el producto?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        await axios.delete(`https://e-commerce-adzq.onrender.com/delete/${id}`);
        setProductos(productos.filter((producto) => producto._id !== id));
        Swal.fire("¡Eliminado!", "El producto ha sido eliminado correctamente", "success");
      }
    } catch (error) {
      console.log("Error al eliminar producto:", error);
      Swal.fire("¡Error!", "Ha ocurrido un error al eliminar el producto", "error");
    }
  };

  const updateProductos = async (producto) => {
    try {
      await axios.put(`https://e-commerce-adzq.onrender.com/update/${producto._id}`, producto);
      obtenerProductos();
      Swal.fire("¡Éxito!", "El producto ha sido actualizado correctamente", "success");
    } catch (error) {
      console.log("Error al actualizar producto:", error);
      Swal.fire("¡Error!", "Ha ocurrido un error al actualizar el producto", "error");
    }
  };

  const getProductoById = async (id) => {
    try {
      const response = await axios.get(`https://e-commerce-adzq.onrender.com/id/${id}`);
      return response.data;  // Debería devolver el producto que recibes
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      throw error;  // O manejar el error de otra manera si lo prefieres
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <ProductsContext.Provider value={{ productos, addProducto, deleteProductos, updateProductos, getCategoria, getProductoById, setProductos }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;