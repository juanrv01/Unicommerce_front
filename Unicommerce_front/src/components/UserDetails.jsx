import React, { useState } from "react";
import { TextField, Button, Grid, Box, Typography, Container, Card, CardContent } from "@mui/material";

export default function Formulario() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
    country: "",
    city: "",
    district: "",
    street: "",
    building_number: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const user = {
    username: "johndoe",
    email: "johndoe@example.com",
    phone: "123456789",
    first_name: "John",
    last_name: "Doe",
    country: "USA",
    city: "New York",
    district: "Manhattan",
    street: "5th Avenue",
    building_number: "101",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    console.log("Datos guardados:", formData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(user);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <Container maxWidth="sm">
      {isEditing ? (
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Formulario de Registro
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Apellido"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="País"
                name="country"
                value={formData.country}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ciudad"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Distrito"
                name="district"
                value={formData.district}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Calle"
                name="street"
                value={formData.street}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Número de Edificio"
                name="building_number"
                value={formData.building_number}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Guardar
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Información del Usuario
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">Nombre de Usuario: {user.username}</Typography>
              <Typography variant="body1">Correo Electrónico: {user.email}</Typography>
              <Typography variant="body1">Teléfono: {user.phone}</Typography>
              <Typography variant="body1">Nombre: {user.first_name}</Typography>
              <Typography variant="body1">Apellido: {user.last_name}</Typography>
              <Typography variant="body1">País: {user.country}</Typography>
              <Typography variant="body1">Ciudad: {user.city}</Typography>
              <Typography variant="body1">Distrito: {user.district}</Typography>
              <Typography variant="body1">Calle: {user.street}</Typography>
              <Typography variant="body1">Número de Edificio: {user.building_number}</Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={handleEdit}
              >
                Editar
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
}
