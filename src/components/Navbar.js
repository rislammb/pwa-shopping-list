import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { ShoppingBag } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import StoreContext from '../store/StoreContext';

const Navbar = ({ drawerWidth, handleDrawerToggle }) => {
  const theme = useTheme();
  const { colorMode } = useContext(StoreContext);

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        mr: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Box sx={{ flex: 1 }}>
          <Link to='/' style={{ color: 'inherit' }}>
            {/* <img src='icon.png' alit='i' width='21' /> */}
            <ShoppingBag />
          </Link>
        </Box>
        <Box>
          <IconButton
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
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
