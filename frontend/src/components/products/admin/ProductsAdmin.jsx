import React, { useState, useContext } from 'react';
import { ProductsProvider } from '../../../context/productos/ProductsContext';
import ProductsFormAdmin from '../admin/ProductsFormAdmin';
import { Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa'; // Iconos de estrella
import './ProductsAdmin.css'

const ProductsAdmin = () => {
  const { productos, addProducto, deleteProductos, updateProductos, getCategoria } = useContext(ProductsProvider);
  const [buscar, setBuscar] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [show, setShow] = useState(false);
  const [editarProducto, setEditarProducto] = useState(null);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de productos por página

  const handleBuscarChange = (e) => setBuscar(e.target.value);
  const handleCategoriaChange = (e) => setCategoriaFiltro(e.target.value);

  const handleAgregarProducto = () => {
    setEditarProducto(null);
    setShow(true);
  };

  const handleEdit = (producto) => {
    setEditarProducto(producto);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const toggleFeatured = (producto) => {
    updateProductos({ ...producto, featured: !producto.featured });
  };

  // Filtrar productos según búsqueda y categoría
  const productosFiltrados = productos.filter((producto) => {
    return (
      producto.name?.toLowerCase().includes(buscar.toLowerCase()) &&
      (categoriaFiltro === "" || producto.category === categoriaFiltro)
    );
  });

  // Obtener productos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='tabla-completa'>
      <div className='encabezado-admin'>
      <h2 className='titulo-encabezado'>Administración de Productos</h2>
      <Button variant="primary" className='boton-agregar' onClick={handleAgregarProducto}>
          Agregar Producto
        </Button>
      </div>
     
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={buscar}
          onChange={handleBuscarChange}
          className="form-control me-2"
        />
        <Form.Select
          value={categoriaFiltro}
          onChange={handleCategoriaChange}
          className="me-2"
        >
          <option value="">Todas las categorías</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Golosinas">Golosinas</option>
          <option value="Limpieza">Limpieza</option>
          <option value="Lácteos">Lácteos</option>
          <option value="Otros">Otros</option>
        </Form.Select>
        
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.name}</td>
              <td>{producto.description}</td>
              <td>{producto.category}</td>
              <td>${producto.price}</td>
              <td>{producto.stock}</td>
              <td>
                <Button variant="link" onClick={() => toggleFeatured(producto)}>
                  {producto.featured ? <FaStar color="gold" /> : <FaRegStar />}
                </Button>
              </td>
              <td className='botones-acciones'>
                <Button variant="info" className='boton-editar' onClick={() => handleEdit(producto)}>Editar</Button>
                <Button variant="danger" className='boton-editar' onClick={() => deleteProductos(producto._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Controles de Paginación */}
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index}
            active={currentPage === index + 1}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>

      {/* Modal para agregar y editar */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editarProducto ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductsFormAdmin
            producto={editarProducto}
            setProducto={setEditarProducto}
            handleClose={handleClose}
            onSubmit={editarProducto ? updateProductos : addProducto}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductsAdmin;