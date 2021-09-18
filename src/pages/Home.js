import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AddItem from '../components/AddItem';
import ShoppingList from '../components/ShoppingList';
import TotalContainer from '../components/TotalContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  header: {
    padding: '15px 5px',
    textAlign: 'center',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  centerDiv: {
    maxWidth: '500px',
    width: '100%',
    margin: '0px auto',
    flexGrow: 1,
    backgroundColor:
      theme.palette.type === 'light'
        ? 'rgba(0,0,0,0.021)'
        : 'rgba(255, 255, 255, 0.03)',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}></div>
      <div className={classes.centerDiv}>
        <Typography className={classes.header} variant='h3'>
          Shopping List
        </Typography>
        <AddItem />
        <ShoppingList />
      </div>
      <TotalContainer />
    </div>
  );
};

export default Home;
