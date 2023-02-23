import { ShoppingBag } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import StoreContext from '../store/StoreContext';

const Navbar = ({ drawerWidth, handleDrawerToggle }) => {
  const theme = useTheme();
  const { toggleColorMode } = useContext(StoreContext);

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        mr: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar
        sx={{
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.dark
              : theme.palette.primary.main,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Link to='/' aria-label='Go home' style={{ color: 'inherit' }}>
            <IconButton aria-label='Home' color='inherit'>
              <ShoppingBag />
            </IconButton>
          </Link>
        </Box>
        <Box>
          <IconButton
            aria-label='Mode'
            sx={{ ml: 1 }}
            onClick={toggleColorMode}
            color='inherit'
          >
            {theme.palette.mode === 'dark' ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Box>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='end'
          onClick={handleDrawerToggle}
          sx={{ ml: 1, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
