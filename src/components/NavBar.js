import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Новости.бел
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/news">Новости</Button>
        <Button color="inherit" component={Link} to="/categories">Категории</Button>
        <Button color="inherit" component={Link} to="/newscategories">Связь новость-категория</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;