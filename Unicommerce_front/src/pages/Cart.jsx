import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../api/cart'; // Importa las funciones de la API del carrito
import { Card, CardContent, Typography, Grid, Container, Button, CircularProgress } from '@mui/material';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await getCart();
        setCart(response.data.cart);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      setCart((prevCart) => ({
        ...prevCart,
        products: prevCart.products.filter((product) => product.id !== productId),
        total: prevCart.total - prevCart.products.find((product) => product.id === productId).price
      }));
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!cart || cart.products.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <Container>
      <h1>Carrito de Compras</h1>
      <Grid container spacing={4}>
        {cart.products.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2">
                  Precio: ${item.price} x {item.quantity}
                </Typography>
                <Button onClick={() => handleRemove(item.id)} color="secondary">
                  Eliminar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <h2>Total: ${cart.total ? cart.total.toFixed(2) : "0.00"}</h2>
      <Button color="primary" onClick={() => setCart(null)}>Vaciar Carrito</Button>
    </Container>
  );
};

export default Cart;
