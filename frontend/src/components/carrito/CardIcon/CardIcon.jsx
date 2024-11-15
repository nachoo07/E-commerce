import React, { useState, useContext } from 'react';
import { CartContext } from '../../../context/carrito/CarritoContext';
import CarritoProducts from '../CartDropdown/CarritoProducts';
import '../carritostyle/carrito.css';
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const CardIcon = () => {
  const { cartItems } = useContext(CartContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <div className="cart-icon">
        <button onClick={toggleDrawer}>
        <FaShoppingCart />
          {cartItems.length > 0 && <span className="item-count">{cartItems.length}</span>}
        </button>
      </div>
     
      {isDrawerOpen && <div className="overlay" onClick={closeDrawer}></div>}
      <CarritoProducts isOpen={isDrawerOpen} onClose={closeDrawer} />
      
    </>
  );
};

export default CardIcon;