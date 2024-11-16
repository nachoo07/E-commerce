import React, { useContext } from 'react';
import { ProductsContext } from '../../context/productos/ProductsContext';
import { CartContext } from '../../context/carrito/CarritoContext';
import '../card/cardProducts.css';
import { Link } from 'react-router-dom';


const CardProducts = () => {
  const { productos } = useContext(ProductsContext); 
  const { addItem } = useContext(CartContext);

  // Filtra solo productos destacados
  //const productosDestacados = productos.filter((producto) => producto.featured);

  const productosDestacados = productos.filter((producto) => producto.featured);



  return (
    <div className="product-cards-container">
      {productosDestacados.map((producto) => (
        <Link to={`/product/${producto._id}`} key={producto.id} className="card-link">
          <div className="card">
            <img src={producto.image} alt={producto.name} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{producto.name}</h5>
              <p className="discounted-price">${producto.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardProducts;

