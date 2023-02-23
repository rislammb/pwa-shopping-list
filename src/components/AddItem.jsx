import { useContext, useEffect, useState } from 'react';

import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import StoreContext from '../store/StoreContext';

const AddItem = ({ day }) => {
  const theme = useTheme();

  const {
    state: { currentItems, singleDay },
    addItem,
    addItemToDay,
  } = useContext(StoreContext);

  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState({
    name: '',
    amount: '',
    price: '',
  });

  const nameChangeHandler = (e) => {
    setError((prev) => ({
      ...prev,
      name: '',
    }));
    setItemName(e.target.value);
  };

  const amountChangeHandler = (e) => {
    setError((prev) => ({
      ...prev,
      amount: '',
    }));
    setAmount(e.target.value);
  };

  const priceChangeHandler = (e) => {
    const tempInput = e.target.value.replace(/[^0-9.]/g, '');
    let i = 0;
    setPrice(
      tempInput.trim().replace(/\./g, function () {
        return ++i >= 2 ? '' : '.';
      })
    );
  };

  const addItemFn = (e) => {
    e.preventDefault();

    setError({ name: '', amount: '', price: '' });
    const exist = day
      ? singleDay?.items?.find(
          (item) => item?.itemName?.toLowerCase() === itemName.toLowerCase()
        )
      : currentItems?.find(
          (item) => item?.itemName?.toLowerCase() === itemName.toLowerCase()
        );

    if (itemName.trim() === '') {
      setError((prev) => ({ ...prev, name: 'Enter item name' }));
    } else if (exist) {
      setError((prev) => ({ ...prev, name: 'This name already exist!' }));
    } else if (amount.trim() === '') {
      setError((prev) => ({ ...prev, amount: 'Enter amount' }));
    } else if (day && price.trim() === '') {
      setError((prev) => ({ ...prev, price: 'Price' }));
    } else {
      if (day) {
        addItemToDay(itemName.trim(), amount.trim(), price.trim());
        setItemName('');
        setAmount('');
        setPrice('');
        setError({ name: '', amount: '', price: '' });
      } else {
        addItem(itemName.trim(), amount.trim());
        setItemName('');
        setAmount('');
        setPrice('');
        setError({ name: '', amount: '', price: '' });
      }
    }
  };
  useEffect(() => {
    setError({ name: '', amount: '', price: '' });
  }, []);

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        '& .MuiTextField-root': { mr: 1 },
      }}
      onSubmit={addItemFn}
      noValidate
      autoComplete='off'
    >
      <TextField
        sx={{ flex: 3 }}
        error={error.name ? true : false}
        helperText={error.name}
        label='Item Name'
        value={itemName}
        autoFocus
        placeholder='Mango'
        onChange={nameChangeHandler}
        variant='standard'
      />
      <TextField
        sx={{ flex: 2 }}
        error={error.amount ? true : false}
        helperText={error.amount}
        label='Amount'
        value={amount}
        placeholder='1 kg'
        onChange={amountChangeHandler}
        variant='standard'
      />
      {day && (
        <TextField
          sx={{ flex: 1 }}
          error={error.price ? true : false}
          helperText={error.price}
          label='Price'
          value={price}
          placeholder='45'
          onChange={priceChangeHandler}
          variant='standard'
        />
      )}
      <IconButton type='submit' color='primary' onClick={addItemFn}>
        <Add fontSize='large' />
      </IconButton>
    </Box>
  );
};

export default AddItem;
