import React, { useState, useContext } from 'react';
import { UsersContext } from '../../context/users/UsersContext'; // Asegúrate de importar tu contexto de usuarios
import UsersFormAdmin from '../usuariosAdmin/UsersFormAdmin'; // Componente para el formulario
import { Table, Button, Modal, Pagination } from 'react-bootstrap';
import '../usuariosAdmin/UsersAdmin.css'

const UsersAdmin = () => {
  const { usuarios, addUsuario, deleteUsuario, updateUsuario } = useContext(UsersContext);

  const [buscar, setBuscar] = useState("");
  const [show, setShow] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState(null);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de usuarios por página

  const handleBuscarChange = (e) => setBuscar(e.target.value);

  const handleAgregarUsuario = () => {
    setEditarUsuario(null);
    setShow(true);
  };

  const handleEdit = (usuario) => {
    setEditarUsuario(usuario);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // Filtrar usuarios según búsqueda
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.email?.toLowerCase().includes(buscar.toLowerCase())
  );

  // Obtener usuarios para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuariosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='tabla-completa'>
      <div className='encabezado-admin'>
        <h2 className='titulo-encabezado'>Administración de Usuarios</h2>
        <Button variant="primary" className='boton-agregar' onClick={handleAgregarUsuario}>
          Agregar Usuario
        </Button>
      </div>
     
      <div className="d-flex mb-3">
        <input
          type="text"
          placeholder="Buscar por correo"
          value={buscar}
          onChange={handleBuscarChange}
          className="form-control me-2"
        />
      </div>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.email}</td>
              <td>{usuario.role}</td>
              <td className='botones-acciones'>
                <Button variant="info" className='boton-editar' onClick={() => handleEdit(usuario)}>Editar</Button>
                <Button variant="danger" className='boton-editar' onClick={() => deleteUsuario(usuario._id)}>Eliminar</Button>
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
          <Modal.Title>{editarUsuario ? "Editar Usuario" : "Agregar Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UsersFormAdmin
            usuario={editarUsuario}
            setUsuario={setEditarUsuario}
            handleClose={handleClose}
            onSubmit={editarUsuario ? updateUsuario : addUsuario}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UsersAdmin;