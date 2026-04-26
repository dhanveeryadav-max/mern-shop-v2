import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (product, qty = 1) => {
    const exists = cartItems.find(item => item._id === product._id);
    let updated;
    if (exists) {
      updated = cartItems.map(item =>
        item._id === product._id ? { ...item, qty: item.qty + qty } : item
      );
    } else {
      updated = [...cartItems, { ...product, qty }];
    }
    saveCart(updated);
  };

  const removeFromCart = (id) => saveCart(cartItems.filter(item => item._id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    saveCart(cartItems.map(item => item._id === id ? { ...item, qty } : item));
  };

  const clearCart = () => saveCart([]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
