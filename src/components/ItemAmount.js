import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flex: 2,
    marginLeft: 5,
  },
}));

const ItemAmount = ({ amount, setAmount }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.root} variant='outlined'>
      <InputLabel>Amount</InputLabel>
      <OutlinedInput
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder='2 kg'
        labelWidth={53}
      />
    </FormControl>
  );
};

export default ItemAmount;
