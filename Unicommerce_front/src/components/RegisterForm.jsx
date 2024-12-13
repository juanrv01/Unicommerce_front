import React, { useState, useRef } from 'react';
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
import { registerUser } from '../api/users';
import ReCAPTCHA from "react-google-recaptcha";

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

export default function RegisterForm() {
    //const classes = useStyles();

    // Estado para capturar los valores de los inputs
    const [formData, setFormData] = useState({
        username: '',
        first_Name: '',
        last_Name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: ''
    });

    const [error, setError] = useState(null);

    // Maneja el cambio de los campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Envía la solicitud POST al servidor para registrar al usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reiniciar error antes de la solicitud

        try {
            // Primero registra al usuario
            const response = await registerUser(formData);
            alert('Usuario registrado con éxito');
            window.location.href = '/login';
        } catch (error) {
            setError(error.response?.data?.detail || 'Error al registrar el usuario');
        }
    };

    const captcha = useRef(null);

    const [isDisabled, setIsDisabled] = useState(true);

    const onChange = () => {
        if (captcha.current.getValue()) {
            setIsDisabled(!isDisabled)
        }
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <StyledPaper>
                <StyledAvatar>
                    <LockOutlinedIcon />
                </StyledAvatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <StyledForm component="form" noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="first_name" // Cambia "firstName" a "first_name"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={formData.first_name}  // Cambia "firstName" a "first_name"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="last_name" // Cambia "lastName" a "last_name"
                                autoComplete="lname"
                                value={formData.last_name}  // Cambia "lastName" a "last_name"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="userName"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="pNumber"
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                autoComplete="tel"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirm_password"
                                label="confirm password"
                                type="password"
                                id="confirm_password"
                                autoComplete="current-password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                    </Grid>
                    <div className='recaptcha'>
                        <ReCAPTCHA
                            ref={captcha}
                            sitekey="6LdLYJoqAAAAAKngYMW0qdRKhcjfInogSTouZZhY"
                            onChange={onChange}
                        />
                    </div>
                    <StyledSubmit
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isDisabled}
                    >
                        Sign Up
                    </StyledSubmit>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </StyledForm>
            </StyledPaper>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}