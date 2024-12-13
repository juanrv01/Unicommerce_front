import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge'; 
import { getCart } from '../api/cart'; 

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [cartItems, setCartItems] = useState(0); 
  const navigate = useNavigate();

  // Verificar si el token JWT es válido
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Si existe el token, verifica si es válido (puedes hacer esto de diferentes maneras)
    if (token) {
      // Aquí podrías hacer una validación adicional si es necesario
      // Por ejemplo, decodificando el token y verificando la fecha de expiración
      setIsLoggedIn(true); // Si el token es válido, setea isLoggedIn a true
    }
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await getCart();
        setCartItems(response.data.cart.products.length); 
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    }

    if (isLoggedIn) {
      fetchCart();
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Lógica para desloguearse, puedes sustituir esto con una llamada a tu API de deslogueo
    localStorage.removeItem('token'); // Elimina el token al desloguearse
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
        </Typography>
        {!isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/register">Register</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>
          
          </>
        ) : (
          <>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cartItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Button color="inherit" component={Link} to="/user-info">User Info</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
