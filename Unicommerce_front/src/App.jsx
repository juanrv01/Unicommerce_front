import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import UserInfo from './pages/UserInfo';

function App() {
  return (
    <Router>
      <Box
        style={{
           // Fondo oscuro para todo el fondo de la página
          backgroundColor: 'lightgrey', // Fondo blanco para el container
          minHeight: '100vh', // Asegura que el fondo cubra toda la pantalla
          display: 'flex', // Usamos flexbox para centrar el contenido
          alignItems: 'center', // Centrado vertical
          justifyContent: 'center', // Centrado horizontal
          padding: 0, // Quitar el padding del Box
          margin: 0, // Eliminar márgenes en el Box
          height: '100%', // Asegura que el Box ocupe el 100% de la altura de la pantalla
        }}
      >
        {/* Contenedor principal con tamaño fijo */}
        <Container
          maxWidth="lg"
          style={{
            backgroundColor: '#ffffff', // Fondo blanco para el container
            padding: '20px', // Espaciado interno
            borderRadius: '8px', // Bordes redondeados
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Sombra para el contenedor
            height: '90vh', // Establecer una altura fija (por ejemplo, 80% de la altura de la pantalla)
            width: '100%', // Asegura que ocupe el ancho completo dentro del contenedor principal
            overflow: 'auto', // Permite desplazamiento si el contenido es demasiado grande
            maxHeight: '1000px', // Evita que el contenedor se haga más grande que 900px
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/user-info" element={<UserInfo />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
