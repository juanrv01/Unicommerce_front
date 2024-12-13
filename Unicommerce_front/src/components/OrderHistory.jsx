import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función que se ejecuta al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage

    // Realizar la solicitud GET a la API para obtener las órdenes
    axios.get('http://localhost:8000/orders/', {
      headers: {
        Authorization: `Bearer ${token}`  // Enviar el token en el header para la autenticación
      }
    })
      .then((response) => {
        setOrders(response.data.orders);  // Guardar las órdenes en el estado
      })
      .catch((error) => {
        setError('No se pudo cargar las órdenes. Intenta nuevamente.');  // Manejar el error
      })
      .finally(() => {
        setLoading(false);  // Finalizar el estado de carga
      });
  }, []);  // Se ejecuta una sola vez cuando se monta el componente

  if (loading) {
    return <CircularProgress />;  // Mostrar un spinner mientras se cargan los datos
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;  // Mostrar un mensaje de error si ocurre alguno
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Mis Órdenes
      </Typography>
      <Card>
        <CardContent>
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
                          Total: ${order.order_price ? order.order_price.toFixed(2) : 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Estado: {order.status}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No tienes órdenes en este momento.</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderList;
