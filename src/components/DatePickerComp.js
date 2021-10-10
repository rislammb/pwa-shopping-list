import * as React from 'react';
import frLocale from 'date-fns/locale/fr';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const DatePickerComp = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
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
