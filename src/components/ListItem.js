import React, { useState, useEffect, useContext } from 'react';
import {
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Check, Delete, Undo } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import ItemPrice from './ItemPrice';

import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 47,
    padding: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      padding: '8px 16px',
    },
  },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
}));

const ListItemComp = ({ item, index, day }) => {
  const classes = useStyles();
  const [price, setPrice] = useState('');
  const {
    state: { singleDay },
    deleteItem,
    toggleByed,
    deleteItemFromDay,
    deleteDay,
    setItemPrice,
  } = useContext(StoreContext);

  const dayItemDelete = () => {
    if (window.confirm(`Are you sure you want to delete '${item.itemName}'?`)) {
      if (singleDay?.items?.length > 1) {
        deleteItemFromDay(singleDay.id, item.id);
      } else {
        deleteDay(singleDay?.id);
      }
    }
  };

  const priceChangeHandler = (inputText) => {
    const tempInput = inputText.replace(/[^0-9.]/g, '');
    let i = 0;
    setPrice(
      tempInput.trim().replace(/\./g, function () {
        return ++i >= 2 ? '' : '.';
      })
    );
  };

  useEffect(() => {
    setPrice(item.price);
  }, [item.price]);

  useEffect(() => {
    setItemPrice(item.id, price);
  }, [price]);

  return (
    <ListItem className={classes.root}>
      <ListItemText style={{ flex: 1 }}>
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </ListItemText>
      <ListItemText style={{ flex: 4 }}>{item.itemName}</ListItemText>
      <ListItemText style={{ flex: 2 }}>{item.amount}</ListItemText>
      <ListItemText style={{ flex: 4 }}>
        {day ? (
          <div className={classes.icons}>
            <IconButton onClick={dayItemDelete}>
              <Delete fontSize='small' color='secondary' />
            </IconButton>
            <Typography>{item.price}</Typography>
          </div>
        ) : item.isByed ? (
          <div className={classes.icons}>
            <IconButton onClick={() => toggleByed(item.id)}>
              <Undo className={classes.icon} />
            </IconButton>
            <ItemPrice price={price} setPrice={priceChangeHandler} />
          </div>
        ) : (
          <div className={classes.icons}>
            <IconButton onClick={() => toggleByed(item.id)}>
              <Check className={classes.icon} />
            </IconButton>
            <IconButton onClick={() => deleteItem(item.id)}>
              <Delete fontSize='small' color='secondary' />
            </IconButton>
          </div>
        )}
      </ListItemText>
    </ListItem>
  );
};

export default ListItemComp;
