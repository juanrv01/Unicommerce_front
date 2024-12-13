import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart } from '../api/cart'; // Importa las funciones de la API del carrito
import { Card, CardContent, Typography, Grid, Container, Button, CircularProgress } from '@mui/material';

const CartContext = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para calcular el total dinámicamente
  const calculateTotal = (products) => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await getCart();
        setCart({
          ...response.data.cart,
          total: calculateTotal(response.data.cart.products), // Calcular el total al cargar el carrito
        });
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
      setCart((prevCart) => {
        const updatedProducts = prevCart.products.filter((product) => product.id !== productId);
        return {
          ...prevCart,
          products: updatedProducts,
          total: calculateTotal(updatedProducts), // Recalcular el total al eliminar el producto
        };
      });
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) => {
      const updatedProducts = prevCart.products.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      );
      return {
        ...prevCart,
        products: updatedProducts,
        total: calculateTotal(updatedProducts), // Recalcular el total al cambiar la cantidad
      };
    });
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
      <Grid container spacing={2}>
        {/* Lista de productos */}
        <Grid item xs={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cart.products.map((item) => (
              <Card key={item.id}>
                <CardContent>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="body2">
                    Precio: ${item.price} x
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      style={{ width: '50px', marginLeft: '8px' }}
                    />
                  </Typography>
                  <Button onClick={() => handleRemove(item.id)} color="secondary">
                    Eliminar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>

        {/* Precio total */}
        <Grid item xs={12}>
          <Typography variant="h6" align="right" style={{ marginTop: '20px' }}>
            Total: ${cart.total.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartContext;
