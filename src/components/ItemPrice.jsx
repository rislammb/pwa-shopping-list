import TextField from '@mui/material/TextField';
import { useContext } from 'react';

import StoreContext from '../store/StoreContext';

const ItemPrice = ({ item }) => {
  const { setItemPrice } = useContext(StoreContext);

  const changeHandler = (e) => {
    const tempInput = e.target.value.replace(/[^0-9.]/g, '');
    let i = 0;
    setItemPrice(
      item.id,
      tempInput.trim().replace(/\./g, function () {
        return ++i >= 2 ? '' : '.';
      })
    );
  };

  return (
    <TextField
      value={item.price}
      autoFocus
      sx={{ '& input': { textAlign: 'center', px: 0.3 } }}
      placeholder='Price'
      size='small'
      onChange={changeHandler}
      variant='standard'
    />
  );
};

export default ItemPrice;
