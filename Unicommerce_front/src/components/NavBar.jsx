import React, { useContext } from 'react'; // Agregamos useContext
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge'; // Importamos Badge de Material-UI
import { CartContext } from '../api/CartContext'; // Importamos el contexto del carrito

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Simulación del estado de login
  const { state } = useContext(CartContext); // Accedemos al estado global del carrito
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para desloguearse, puedes sustituir esto con una llamada a tu API de deslogueo
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          setIsLoggedIn(false);
          navigate('/login');
        } else {
          console.error('Error logging out');
        }
      })
      .catch(error => {
        console.error('Error logging out', error);
      });
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
              <Badge badgeContent={state.items.length} color="secondary">
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
