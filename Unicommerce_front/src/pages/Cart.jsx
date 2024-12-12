import React, { useContext } from 'react';
import { CartContext } from '../api/CartContext';

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);

  const handleRemove = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {state.items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {state.items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} x {item.quantity}
              <button onClick={() => handleRemove(item)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
      <h2>Total: ${state.total.toFixed(2)}</h2>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Vaciar Carrito</button>
    </div>
  );
};

export default Cart;
