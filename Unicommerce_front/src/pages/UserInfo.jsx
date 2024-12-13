import React from 'react';
import OrderHistory from '../components/OrderHistory';
import UserDetails from '../components/UserDetails';
import { Grid, Container } from '@mui/material';

function UserInfo() {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <UserDetails />
        </Grid>
        <Grid item xs={12} md={6}>
          <OrderHistory />
        </Grid>
      </Grid>
    </Container>
  );
}

export default UserInfo;
