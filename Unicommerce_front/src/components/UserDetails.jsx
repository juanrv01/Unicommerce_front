// Formulario.js
import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, Typography, Container, Card, CardContent } from "@mui/material";
import { retrieveUserInfo } from '../api/users'; // Importamos la función

export default function Formulario() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
  });

  const [user, setUser] = useState(null); // Para almacenar los datos del usuario
  const [isEditing, setIsEditing] = useState(false);

  // Realizar la solicitud a la API para obtener los datos del usuario
  useEffect(() => {
    // Suponiendo que el token de autenticación está guardado en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      retrieveUserInfo(token) // Usamos la función importada
        .then((data) => {
          setUser(data);
          setFormData(data); // Llenar el formulario con los datos del usuario
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
        });
    }
  }, []);

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
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Si no hay usuario, muestra un mensaje de carga o error
  if (!user) {
    return <Typography variant="h6">Cargando información del usuario...</Typography>;
  }

  return (
    <Container maxWidth="sm">
       
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
            
            </CardContent>
          </Card>
        </Box>
      
    </Container>
  );
}
