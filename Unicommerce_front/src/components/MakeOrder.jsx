import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const MakeOrder = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('mastercard'); // Default payment method
  const [loading, setLoading] = useState(false);

  // Manejo de cambios para los campos de tarjeta
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejo del método de pago
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Simulación de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = 'http://localhost:8000/orders/';
    const token = localStorage.getItem('token'); // JWT token.

    const data = {
      payment_method: paymentMethod,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // JWT para autenticación
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Orden realizada con éxito');
        console.log('Order response:', result);
      } else {
        const errorData = await response.json();
        alert('Error al realizar la orden: ' + (errorData.error || 'Inténtalo de nuevo.'));
        console.error('Order error:', errorData);
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
      console.error('Network error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Realizar Pedido
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Simulación de los campos de tarjeta */}
          <Grid item xs={12}>
            <TextField
              label="Número de tarjeta"
              variant="outlined"
              fullWidth
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              inputProps={{ maxLength: 16 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Titular de la tarjeta"
              variant="outlined"
              fullWidth
              name="cardHolder"
              value={formData.cardHolder}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Fecha de expiración (MM/AA)"
              variant="outlined"
              fullWidth
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              inputProps={{ maxLength: 3 }}
            />
          </Grid>

          {/* Selección del método de pago */}
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Método de Pago</FormLabel>
              <RadioGroup
                name="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel value="mastercard" control={<Radio />} label="Pagar con Mastercard" />
                <FormControlLabel value="visa" control={<Radio />} label="Pagar con Visa" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Procesando...' : 'Realizar Pago'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default MakeOrder;
