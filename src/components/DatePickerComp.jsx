import 'dayjs/locale/en-au';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const DatePickerComp = ({ date, setDate }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-au'>
      <DatePicker
        disableFuture
        openTo='day'
        views={['day', 'month', 'year']}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => (
          <TextField
            variant='standard'
            sx={{ width: 120 }}
            helperText={null}
            {...params}
          />
        )}
      />
    </LocalizationProvider>
  );
};

// const DatePickerComp = ({ date, setDate }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
//       <DatePicker
//         views={['day']}
//         maxDate={new Date()}
//         value={date}
//         onChange={(newValue) => {
//           setDate(newValue);
//         }}
//         renderInput={(params) => (
//           <TextField
//             variant='standard'
//             sx={{ width: 120 }}
//             {...params}
//             helperText={null}
//           />
//         )}
//       />
//     </LocalizationProvider>
//   );
// };
export default DatePickerComp;
