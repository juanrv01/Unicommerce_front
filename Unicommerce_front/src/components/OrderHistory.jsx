import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        console.log('Response data:', response.data); // Inspecciona la respuesta
        if (response.data.orders) {
          setOrders(response.data.orders); // Accede a la lista de órdenes
        }
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  return (
    <div>
      <h2>Historial de Órdenes</h2>
      <ul>
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map(order => (
            <li key={order.id}>
              <p>Orden ID: {order.id}</p>
              <p>Fecha: {new Date(order.created_at).toLocaleDateString()}</p>
              <p>Total: {order.order_price}</p>
              <p>Productos:</p>
              <ul>
                {order.products.map(product => (
                  <li key={product.id}>
                    <p>Nombre: {product.name}</p>
                    <p>Cantidad: {product.quantity}</p>
                    <p>Precio Total: {product.Totalprice}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No hay órdenes disponibles.</p>
        )}
      </ul>
    </div>
  );
};


export default OrderHistory;