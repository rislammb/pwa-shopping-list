import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AddItem from '../components/AddItem';
import ShoppingList from '../components/ShoppingList';
import TotalPrice from '../components/TotalPrice';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
    maxWidth: '500px',
    width: '100%',
    margin: '0px auto',
  },
  header: {
    textAlign: 'center',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant='h3'>
        Shopping List
      </Typography>
      <AddItem />
      <ShoppingList />
      <TotalPrice />
    </div>
  );
};

export default Home;
