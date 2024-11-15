import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const ProductsProvider = createContext();

const ProductsContext = ({ children }) => {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      const response = await axios.get("https://e-commerce-baoo.onrender.com/");
      console.log("Response data:", response.data);  // Log para ver la respuesta
      setProductos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProducto = async (producto) => {
    try {
      const response = await axios.post("https://e-commerce-baoo.onrender.com/create", producto);
      setProductos([...productos, response.data]);
      Swal.fire("¡Éxito!", "El producto ha sido creado correctamente", "success");
      obtenerProductos();
    } catch (error) {
      console.log(error);
      Swal.fire("¡Error!", "Ha ocurrido un error al crear el producto", "error");
    }
  };

  const getCategoria = async (category) => {
    try {
      const response = await axios.get(`https://e-commerce-baoo.onrender.com/?category=${category}`);
      setProductos(response.data);
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
        await axios.delete(`https://e-commerce-baoo.onrender.com/delete/${id}`);
        setProductos(productos.filter((producto) => producto.id !== id));
        Swal.fire("¡Eliminado!", "El producto ha sido eliminado correctamente", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("¡Error!", "Ha ocurrido un error al eliminar el producto", "error");
    }
  };

  const updateProductos = async (producto) => {
    try {
      await axios.put(`https://e-commerce-baoo.onrender.com/update/${producto.id}`, producto);
      await obtenerProductos();
      Swal.fire("¡Éxito!", "El producto ha sido actualizado correctamente", "success");
    } catch (error) {
      console.log(error);
      Swal.fire("¡Error!", "Ha ocurrido un error al actualizar el producto", "error");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <ProductsProvider.Provider value={{ productos, addProducto, deleteProductos, updateProductos, getCategoria }}>
      {children}
    </ProductsProvider.Provider>
  );
};

export default ProductsContext;