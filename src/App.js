import React, { useState, useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import ProgressBar from './components/ProgressBar';
import Main from './components/Main';
import DrawerList from './components/DrawerList';
import ModalComp from './components/ModalComp';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import StoreContext from './store/StoreContext';

const drawerWidth = 240;

function App(props) {
  const theme = useTheme();
  const {
    state: { dataLoading },
  } = useContext(StoreContext);
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
      maxWidth: 470,
      mx: 'auto',
      overflow: 'hidden',
      minHeight: '100vh',
      background:
        theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.035)'
          : 'rgba(0,0,0,0.035)',
    },
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', background: theme.palette.background.paper }}>
        <CssBaseline />
        <Navbar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box component='main' sx={styles.main}>
          <Toolbar />
          {dataLoading ? <ProgressBar /> : <Main />}
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
    </Router>
  );
}

export default App;
