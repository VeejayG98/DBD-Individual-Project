// import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';

function NavBar() {
  return(
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <BookIcon fontSize='large'/>
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          UTD Library Management
        </Typography>
        <Stack direction='row' spacing={2} >
          <Button color='inherit'>Check in Book</Button>
          <Button color='inherit'>Pay Fines</Button>
          <Button color='inherit'>View Fines</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
