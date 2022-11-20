// import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import {useNavigate} from "react-router-dom";

function NavBar() {

  const navigate = useNavigate();

  return(
    <AppBar position='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => navigate('/')}>
          <BookIcon fontSize='large'/>
        </IconButton>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          UTD Library Management
        </Typography>
        <Stack direction='row' spacing={2} >
          <Button color='inherit' onClick={() => navigate('/checkin')}>Check in Book</Button>
          <Button color='inherit' onClick={() => navigate('/payment/fines')}>Pay Fines</Button>
          <Button color='inherit' onClick={() => navigate('/view-fines')}>View Fines</Button>
          <Button color='inherit' onClick={() => navigate('/borrowers/signup')}>Add New Borrower</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
