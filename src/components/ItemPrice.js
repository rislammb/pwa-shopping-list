import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flex: 2,
    marginLeft: 5,
    textAlign: 'right',
  },
}));

const ItemPrice = ({ price, setPrice }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root} variant='outlined'>
      <InputLabel>Price</InputLabel>
      <OutlinedInput
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder='75'
        labelWidth={35}
      />
    </FormControl>
  );
};

export default ItemPrice;
