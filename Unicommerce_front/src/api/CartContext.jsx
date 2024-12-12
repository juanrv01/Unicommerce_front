import React, { createContext, useReducer } from 'react';

// Estado inicial del carrito
const initialState = {
  items: [], // Productos en el carrito
  total: 0,  // Total del carrito
};

// Reducer del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          total: state.total + action.payload.price,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          total: state.total + action.payload.price,
        };
      }
    case 'REMOVE_FROM_CART':
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      const itemToRemove = state.items.find(item => item.id === action.payload.id);
      return {
        ...state,
        items: filteredItems,
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

// Contexto del carrito
export const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
