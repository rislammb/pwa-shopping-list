import React from 'react';
import { FormControl, InputLabel, OutlinedInput } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flex: 3,
  },
}));

const ItemNameInput = ({ itemName, setItemName }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.root} variant='outlined'>
      <InputLabel>Item Name</InputLabel>
      <OutlinedInput
        value={itemName}
        autoFocus
        onChange={(e) => setItemName(e.target.value)}
        placeholder='Mango'
        labelWidth={75}
      />
    </FormControl>
  );
};

export default ItemNameInput;
