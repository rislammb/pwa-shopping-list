import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import DrawerList from './components/DrawerList';
import Main from './components/Main';
import ModalComp from './components/ModalComp';
import Navbar from './components/Navbar';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import './App.css';

const drawerWidth = 240;

const App = (props) => {
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const styles = {
    main: {
      flexGrow: 1,
      px: 1,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 540,
      mx: 'auto',
      overflow: 'hidden',
      minHeight: '100vh',
    },
  };

  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', background: theme.palette.background.paper }}>
        <CssBaseline />
        <Navbar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component='main' sx={styles.main}>
          <Toolbar />
          <Main />
        </Box>
        <Box
          component='nav'
          sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label='mailbox folders'
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            anchor='right'
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { sm: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                background: theme.palette.background.paper,
              },
            }}
          >
            <DrawerList toggleDrawer={handleDrawerToggle} />
          </Drawer>
          <Drawer
            variant='permanent'
            anchor='right'
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <DrawerList />
          </Drawer>
        </Box>
      </Box>
      <ModalComp />
    </BrowserRouter>
  );
};

export default App;
