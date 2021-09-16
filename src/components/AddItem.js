import React, { useState, useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import ItemNameInput from './ItemNameInput';
import ItemAmount from './ItemAmount';

import StoreContext from '../store/storeContext';
import ItemPrice from './ItemPrice';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    marginLeft: 5,
    padding: theme.spacing(0.7),
    backgroundColor: '#eee',
  },
}));

const AddItem = ({ day }) => {
  const classes = useStyles();
  const {
    state: { currentItems, singleDay },
    addItem,
    addItemToDay,
  } = useContext(StoreContext);
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const priceChangeHandler = (inputText) => {
    const tempInput = inputText.replace(/[^0-9.]/g, '');
    let i = 0;
    setPrice(
      tempInput.trim().replace(/\./g, function () {
        return ++i >= 2 ? '' : '.';
      })
    );
  };

  const addItemFn = () => {
    const exist = day
      ? singleDay?.items?.find(
          (item) => item?.itemName?.toLowerCase() === itemName.toLowerCase()
        )
      : currentItems?.find(
          (item) => item?.itemName?.toLowerCase() === itemName.toLowerCase()
        );

    if (
      day &&
      (itemName.trim() === '' || amount.trim() === '' || price.trim() === '')
    ) {
      alert('Please enter item name, amount and price');
    } else if (itemName.trim() === '' || amount.trim() === '') {
      alert('Please enter item name and amount');
    } else if (exist) {
      alert('This item name already exist!');
    } else {
      if (day) {
        addItemToDay(itemName.trim(), amount.trim(), price.trim());
      } else {
        addItem(itemName.trim(), amount.trim());
      }
      setItemName('');
      setAmount('');
      setPrice('');
    }
  };

  return (
    <div className={classes.root}>
      <ItemNameInput itemName={itemName} setItemName={setItemName} />
      <ItemAmount amount={amount} setAmount={setAmount} />
      {day && <ItemPrice price={price} setPrice={priceChangeHandler} />}
      <IconButton className={classes.btn} color='primary' onClick={addItemFn}>
        <Add fontSize='large' />
      </IconButton>
    </div>
  );
};

export default AddItem;
