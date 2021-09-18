import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import TotalPrice from './TotalPrice';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    left: 0,
    bottom: 0,
    backgroundColor: '#def6fd',
    zIndex: 1,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - 220px)`,
      marginRight: 220,
    },
  },
  btn: {
    marginRight: theme.spacing(1),
  },
}));

const TotalContainer = ({ day }) => {
  const classes = useStyles();

  const {
    state: { currentItems, singleDay },
    toggleModal,
    clearCurrentItems,
  } = useContext(StoreContext);

  const calculateTotal = () => {
    const newItems = day
      ? singleDay.items.filter((item) => +item.price > 0)
      : currentItems.filter((item) => +item.price > 0);

    let totalPrice = 0;
    newItems.map((item) => (totalPrice += +item.price));
    return totalPrice.toFixed(2);
  };

  const saveList = () => {
    const newItems = currentItems.filter(
      (item) => item.isByed !== true || item.price === ''
    );
    if (newItems.length > 0) {
      window.alert('Your shopping not completed!');
    } else {
      toggleModal();
    }
  };

  const clearCurrentItemsFn = () => {
    if (window.confirm('Are you sure you want to delete all items?')) {
      clearCurrentItems();
    }
  };

  return (
    <div className={classes.root}>
      {day ? (
        <TotalPrice day={day} total={calculateTotal()} />
      ) : (
        <TotalPrice day={day} total={calculateTotal()}>
          <Button
            className={classes.btn}
            color='primary'
            disabled={currentItems.length < 1 ? true : false}
            onClick={saveList}
          >
            Save Day
          </Button>

          <Button
            className={classes.btn}
            color='secondary'
            disabled={currentItems.length < 1 ? true : false}
            onClick={clearCurrentItemsFn}
          >
            Clear all
          </Button>
        </TotalPrice>
      )}
    </div>
  );
};

export default TotalContainer;
