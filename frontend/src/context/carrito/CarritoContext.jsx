import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CarritoContext = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

// Función para agregar un artículo al carrito
const addItem = (item, quantity = 1) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // Si el producto ya existe en el carrito, incrementa su cantidad según la seleccionada
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + quantity } 
          : cartItem
      ));
    } else {
      // Si es un nuevo producto, agréguelo con la cantidad seleccionada
      setCartItems([...cartItems, { ...item, quantity }]);
    }
  };

  // Función para eliminar un artículo del carrito
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Función para incrementar la cantidad de un artículo
  const incrementItem = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

    // Función para decrementar la cantidad de un artículo
    const decrementItem = (id) => {
        setCartItems(cartItems.map(item => 
          item.id === id && item.quantity > 1 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        ).filter(item => item.quantity > 0)); // Elimina el artículo si su cantidad es 0
      };
    
      // Calcula el precio total cada vez que cartItems cambia
      useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
      }, [cartItems]);
  return (
    <>
     <CartContext.Provider value={{ cartItems, totalPrice, addItem, removeItem, incrementItem, decrementItem }}>
      {children}
    </CartContext.Provider>
    </>
  )
}

export default CarritoContext