// Cart.jsx
import React from 'react';
import { Container, Grid } from '@mui/material';
import CartContext from '../components/CartContext'; // Este es el componente que consume el contexto
import OrderHistory from '../components/OrderHistory';
import UserDetails from '../components/UserDetails';
import MakeOrder from '../components/MakeOrder'; // Este componente lo agregarás más tarde

function Cart() {
  return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CartContext />  {/* Este es el componente que maneja y muestra el carrito */}
          </Grid>
          <Grid item xs={12} md={6}>
            //<MakeOrder />  {/* Este será el componente para realizar un pedido */}
          </Grid>
        </Grid>
      </Container>
  );
}

export default Cart;
