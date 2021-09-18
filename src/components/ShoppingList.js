import React, { useState, useContext, useEffect } from 'react';
import { Typography, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from './ListItem';
import StoreContext from '../store/storeContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    marginBottom: 51,
  },
  center: {
    textAlign: 'center',
    padding: '45px 8px',
  },
}));

const ShoppingList = ({ day }) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    state: { singleDay, currentItems },
  } = useContext(StoreContext);

  useEffect(() => {
    if (day) {
      setItems(singleDay.items);
    } else {
      setItems(currentItems);
    }
    setLoading(false);
  }, [day, singleDay.items, currentItems]);

  return (
    <List className={classes.root}>
      {loading ? (
        <Typography className={classes.center}>Loading..</Typography>
      ) : items.length > 0 ? (
        items.map((item, index) => (
          <ListItem key={item.id} item={item} index={index} day={day} />
        ))
      ) : (
        <Typography className={classes.center}>
          There are no shopping list item.
        </Typography>
      )}
    </List>
  );
};

export default ShoppingList;
