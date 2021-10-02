import * as React from 'react';
import { TextField, Stack } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const DatePickerComp = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={['day']}
        maxDate={new Date()}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => (
          <TextField
            variant='standard'
            sx={{ width: 120 }}
            {...params}
            helperText={null}
          />
        )}
      />
    </LocalizationProvider>
  );
};
export default DatePickerComp;
