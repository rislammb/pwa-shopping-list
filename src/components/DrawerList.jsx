import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Home, Mail, Message } from '@mui/icons-material';
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
      color: theme.palette.mode === 'dark' ? 'lightgreen' : '#0aaa1a',
    },
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <NavLink
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
      </List>
      <Divider />
      <List>
        <NavLink
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
