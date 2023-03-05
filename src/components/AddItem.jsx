import { useContext } from 'react';

import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import useForm from '../hooks/useForm';
import StoreContext from '../store/StoreContext';

const initial = (details) =>
  details ? { name: '', amount: '', price: '' } : { name: '', amount: '' };

const validate = (values) => {
  const errors = {};

  Object.keys(values).forEach((key) => {
    if (key === 'name') {
      if (values[key].length < 1) {
        errors[key] = 'Enter a name';
      }
    } else if (key === 'amount') {
      if (values[key].length < 1) {
        errors[key] = 'Enter a amonut';
      }
    } else if (key === 'price') {
      if (values[key].length < 1) {
        errors[key] = 'Enter a price';
      } else if (!/^\d+(\.\d{1,2})?$/.test(values[key])) {
        errors[key] = 'Price must number';
      }
    }
  });

  return { valid: Object.keys(errors).length < 1, errors };
};

const AddItem = ({ detailsDay }) => {
  const { addItem, addItemToDay } = useContext(StoreContext);

  const {
    state,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    handleAfterSubmit,
  } = useForm(initial(detailsDay), validate);

  const inputsForRender = [
    {
      label: 'Item name',
      name: state.name.name,
      value: state.name.value,
      error: state.name.error,
      placeholder: 'Mango',
      style: { flex: '2 150px' },
    },
    {
      label: 'Amount',
      name: state.amount.name,
      value: state.amount.value,
      error: state.amount.error,
      placeholder: '1 kg',
      style: { flex: '1 120px' },
    },
  ];

  detailsDay &&
    inputsForRender.push({
      label: 'Price',
      name: state.price.name,
      value: state.price.value,
      error: state.price.error,
      placeholder: '45',
      style: { flexBasis: '100px' },
    });

  const addItemFn = (values) => {
    if (detailsDay) {
      addItemToDay(detailsDay.id, values, handleAfterSubmit);
    } else {
      addItem(values, handleAfterSubmit);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 1,
      }}
      onSubmit={(e) => handleSubmit(e, addItemFn)}
      noValidate
      autoComplete='off'
    >
      {inputsForRender.map((input) => (
        <TextField
          key={input.name}
          label={input.label}
          name={input.name}
          value={input.value}
          error={input.error ? true : false}
          helperText={input.error}
          placeholder={input.placeholder}
          sx={input.style}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          variant='standard'
        />
      ))}

      <IconButton size='small' aria-label='Add' type='submit' color='primary'>
        <Add fontSize='large' />
      </IconButton>
    </Box>
  );
};

export default AddItem;
