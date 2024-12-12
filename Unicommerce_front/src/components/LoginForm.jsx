import React from 'react';
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

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

{/*const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})); */}

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
                <StyledForm component="form" noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
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