import React from 'react';
import { NavLink } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Message, Home, Mail } from '@mui/icons-material';

const DrawerList = ({ toggleDrawer }) => {
  const theme = useTheme();

  const styles = {
    link: {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
    activeLink: {
      color: theme.palette.mode === 'dark' ? 'lightgreen' : 'green',
    },
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <NavLink
          exact
          to='/'
          activeStyle={styles.activeLink}
          style={styles.link}
        >
          <ListItem button onClick={() => toggleDrawer && toggleDrawer()}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Shopping List' />
          </ListItem>
        </NavLink>
        <NavLink to='/day' activeStyle={styles.activeLink} style={styles.link}>
          <ListItem button onClick={() => toggleDrawer && toggleDrawer()}>
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
          activeStyle={styles.activeLink}
          style={styles.link}
        >
          <ListItem button onClick={() => toggleDrawer && toggleDrawer()}>
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
