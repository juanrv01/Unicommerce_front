import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        if (response.data.orders) {
          setOrders(response.data.orders);
        }
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Historial de Órdenes
        </Typography>
        {orders.length > 0 ? (
          <List>
            {orders.map(order => (
              <ListItem key={order.id} alignItems="flex-start">
                <ListItemText
                  primary={`Orden ID: ${order.id}`}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        Fecha: {new Date(order.created_at).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total: ${order.order_price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Productos:
                      </Typography>
                      <List>
                        {order.products.map(product => (
                          <ListItem key={product.id}>
                            <ListItemText
                              primary={`${product.name} - Cantidad: ${product.quantity}`}
                              secondary={`Precio Total: $${product.Totalprice.toFixed(2)}`}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No hay órdenes disponibles.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
