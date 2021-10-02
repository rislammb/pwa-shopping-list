import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ItemName = ({ itemName, setItemName, error }) => {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        <TextField
          error={error.name ? true : false}
          label='Item Name'
          value={itemName}
          autoFocus
          placeholder='Mango'
          onChange={(e) => setItemName(e.target.value)}
          variant='standard'
        />
        <TextField
          error
          id='standard-error'
          label='Error'
          defaultValue='Hello World'
          variant='standard'
        />
        <TextField
          error
          id='standard-error-helper-text'
          label='Error'
          defaultValue='Hello World'
          helperText='Incorrect entry.'
          variant='standard'
        />
      </div>
    </Box>
  );
};

export default ItemName;
