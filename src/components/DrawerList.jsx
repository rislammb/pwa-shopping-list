import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Home, Info, Mail, Message } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const DrawerList = ({ toggleDrawer }) => {
  const theme = useTheme();

  const styles = {
    link: {
      color: theme.palette.primary.main,
    },
    activeLink: {
      color: theme.palette.mode === 'dark' ? '#9affca' : '#0aaa1a',
    },
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <NavLink
          aria-label='Go home'
          to='/'
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <ListItem onClick={() => toggleDrawer && toggleDrawer()}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Shopping List' />
          </ListItem>
        </NavLink>
        <NavLink
          aria-label='Go day list'
          to='/day'
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <ListItem onClick={() => toggleDrawer && toggleDrawer()}>
            <ListItemIcon>
              <Message />
            </ListItemIcon>
            <ListItemText primary='Saved Day' />
          </ListItem>
        </NavLink>
        <NavLink
          aria-label='About this App'
          to='/about'
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <ListItem onClick={() => toggleDrawer && toggleDrawer()}>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary='About this App' />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <NavLink
          aria-label='Go contact'
          to='/contact'
          style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
        >
          <ListItem onClick={() => toggleDrawer && toggleDrawer()}>
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary='Contact' />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );
};

export default DrawerList;
