import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { loginUser } from '../api/users';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Unicommerce
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const StyledPaper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const StyledAvatar = styled(Box)(({ theme }) => ({
    margin: theme?.spacing(1) || 8,
    backgroundColor: theme?.palette?.secondary?.main || '#f50057',
    width: theme?.spacing(7) || 56,
    height: theme?.spacing(7) || 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
}));

const StyledForm = styled(Box)(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(3),
}));

const StyledSubmit = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

export default function LoginForm() {
    //const classes = useStyles();

    // Estado para capturar los valores de los inputs
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState(null);

    // Maneja el cambio de los campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Envía la solicitud POST al servidor para iniciar sesión
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);  // Reiniciar error antes de la solicitud

        try {
            const response = await loginUser(formData);
            alert('Login exitoso');
            // Guardar el token en el localStorage o en un contexto
            localStorage.setItem('token', response.access);  // Suponiendo que el token está en 'access'
            // Redirigir al usuario a la página principal
            window.location.href = '/';
        } catch (error) {
            setError(error.response?.data?.detail || 'Error al iniciar sesión');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <StyledPaper>
                <StyledAvatar>
                    <LockOutlinedIcon />
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <StyledForm component="form" noValidate onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <StyledSubmit
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </StyledSubmit>
                    <Grid container>
                        <Grid item xs>
                            
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </StyledForm>
            </StyledPaper>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}