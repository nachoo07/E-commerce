import React, { useState, useContext } from 'react';
import { ProductsContext } from '../../context/productos/ProductsContext';
import { CartContext } from '../../context/carrito/CarritoContext';
import { Link } from 'react-router-dom';
import '../card/allProductsPage.css'

const AllProductsPage = () => {
  const { productos } = useContext(ProductsContext);
  const { addItem } = useContext(CartContext);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  // Filtrar productos por categoría
  const productosFiltrados = productos.filter((producto) => 
    categoriaSeleccionada === "" || producto.category === categoriaSeleccionada
  );

  
  return (
    <div className="all-products-page">
      <aside className="sidebar-filtros">
        <h3>Categoría de Productos</h3>
        <ul>
          <li onClick={() => setCategoriaSeleccionada("")}>Todas</li>
          <li onClick={() => setCategoriaSeleccionada("Bebidas")}>Bebidas</li>
          <li onClick={() => setCategoriaSeleccionada("Golosinas")}>Golosinas</li>
          <li onClick={() => setCategoriaSeleccionada("Limpieza")}>Limpieza</li>
          <li onClick={() => setCategoriaSeleccionada("Lácteos")}>Lácteos</li>
          <li onClick={() => setCategoriaSeleccionada("Otros")}>Otros</li>
        </ul>
      </aside>

      <div className="product-cards-container">

      {productosFiltrados.map((producto, index) => {
  if (!producto._id) {
    console.error('Producto sin _id:', producto); // Verificar si algún producto no tiene _id
    return null; // No renderiza este producto si no tiene _id
  }

  return (
    <Link to={`/product/${producto._id}`} key={producto._id || index} className="card-link">
      <div className="card">
        <img src={producto.image} alt={producto.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{producto.name}</h5>
          <p className="discounted-price">${producto.price}</p>
        </div>
      </div>
    </Link>
  );
})}
      </div>
      
    </div>
  );
};

export default AllProductsPage;