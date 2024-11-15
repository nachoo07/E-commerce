import React, { useContext } from 'react';
import { CartContext } from '../../../context/carrito/CarritoContext';
import '../carritostyle/carrito.css';
import { FaTrash } from "react-icons/fa";
import { VscAdd } from "react-icons/vsc";
import { VscChromeMinimize } from "react-icons/vsc";

const CarritoProducts = ({ isOpen, onClose }) => {
  const { cartItems, removeItem, incrementItem, decrementItem, totalPrice } = useContext(CartContext);

  return (
    <>
      {/* Overlay que desactiva el contenido de la página cuando el carrito está abierto */}
      {isOpen && <div className="overlay" onClick={onClose}></div>}
      
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Carrito de compras</h2>
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <span>{item.name}</span>
                  <div className="item-controls">
                    <VscChromeMinimize onClick={() => decrementItem(item.id)}/>
                    <span className="quantity-display">{item.quantity}</span>
                    <VscAdd onClick={() => incrementItem(item.id)}/>
                  </div>
                  <p>Precio: ${parseFloat(item.price).toFixed(2)}</p>
                  <FaTrash onClick={() => removeItem(item.id)} className="delete-icon"/>
                </div>
              </div>
            ))}
            <div className="cart-subtotal">
              <span>Subtotal (sin envío)</span>
              <span>$ {totalPrice.toFixed(2)}</span>
            </div>

            <div className="shipping-section">
              <h4>Medios de envío</h4>
              <p>Entregas para el CP: <strong>4107</strong> <a href="#">Cambiar CP</a></p>
              <div className="shipping-alert">
                Las entregas pueden sufrir demoras. ¡No te preocupes! Una vez realizada la compra, nos contactaremos contigo.
              </div>
              <div className="shipping-option">
                <span>Envío estándar (08:00 a 18:00 h)</span>
                <span>$39,347.90</span>
              </div>
              <p className="estimated-delivery">Llega entre el miércoles 11/12 y el viernes 13/12</p>
            </div>

            <div className="total-section">
              <h3>Total</h3>
              <h3>$ {(totalPrice + 39347.90).toFixed(2)}</h3>
            </div>

            <p className="installments">O hasta 3 x ${(totalPrice / 3).toFixed(2)} sin interés</p>
            <button className="checkout-button">Iniciar Compra</button>
          </div>
        ) : (
          <span>El carrito está vacío</span>
        )}
      </div>
    </>
  );
};

export default CarritoProducts;