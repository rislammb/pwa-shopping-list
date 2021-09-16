import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Message, Home, Mail, DetailsOutlined } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
    color: theme.palette.type === 'dark' ? '#eee' : theme.palette.primary.main,
  },
}));

const DrawerList = ({ closeDrawer }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <NavLink
          exact
          to='/'
          onClick={closeDrawer}
          activeStyle={{
            color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary='Shopping List' />
          </ListItem>
        </NavLink>
        <NavLink
          to='/day'
          onClick={closeDrawer}
          activeStyle={{
            color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <Message />
            </ListItemIcon>
            <ListItemText primary='Saved Day' />
          </ListItem>
        </NavLink>
        <NavLink
          to='/details/sdgsd'
          onClick={closeDrawer}
          activeStyle={{
            color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
          }}
          className={classes.link}
        >
          <ListItem button>
            <ListItemIcon>
              <DetailsOutlined />
            </ListItemIcon>
            <ListItemText primary='Day Details' />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <NavLink
          to='/contact'
          onClick={closeDrawer}
          activeStyle={{
            color: theme.palette.type === 'dark' ? 'lightgreen' : 'green',
          }}
          className={classes.link}
        >
          <ListItem button>
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
