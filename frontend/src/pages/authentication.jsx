import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';





function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

    const [ username , setUsername] = React.useState();
    const [ password , setPassword] = React.useState();
    const [ name  , setName] = React.useState();
    const [ error , setError] = React.useState();
    const [ message, setMessage] = React.useState();


    const [ formState, setFormState] = React.useState(0);

    const [open , setOpen] = React.useState(false);

    const { handleLogin, handleRegister} = React.useContext(AuthContext);
  

    let handleAuth = async ()=>{
      try {
        if( formState ===0) { 
         let result = await handleLogin(username , password);

        }
        if (formState === 1){
          let result = await handleRegister(name , username , password);
          console.log(result)
          setUsername("");
          setMessage(result);
          setOpen(true);
          setError("");
          setFormState(0)
          setPassword("")

        }
      }
      catch(err) {
       
       let message = (err.response.data.message);
       setError(message);
     
      
    }
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

           <div>
            <Button variant={formState === 0 ? "contained" : "" } onClick = {() => setFormState(0)}>
                Sign in 
           </Button>
            <Button variant = {formState === 1 ? "contained" : ""} onClick = {() => setFormState(1)}>
                Sign Up
            </Button>
           </div>
           
            <Box component="form" noValidate  sx={{ mt: 1 }}>
                {formState === 1 ? 
            <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="fullName"
                name="fullName"
                value={name}
                autoComplete="fullName"
                autoFocus
                onChange={(e)=>setName(e.target.value)}
              /> : <></>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                autoComplete="username"
                autoFocus
                onChange={(e)=>setUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                value={password}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
                <p style={{color : "red"}}>{error} </p>

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
           
              >{formState === 0 ? "Login" : "Register"}
               
              </Button>
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
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
      open={open}
      autoHideDuration = {4000}
       message = {message}
      />
    </ThemeProvider>
  );
} 