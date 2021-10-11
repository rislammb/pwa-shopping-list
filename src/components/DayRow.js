import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

import StoreContext from '../store/StoreContext';

const DayRow = ({ day }) => {
  const { setSingleDay, deleteDay } = useContext(StoreContext);
  const theme = useTheme();

  const calculateTotal = () => {
    let total = 0;
    day.items.map((item) => (total += +item.price));
    return total.toFixed(2);
  };

  const getDate = () => {
    const localString = new Date(day?.date).toDateString();
    const date = localString.substr(8, 2);
    const month = localString.substr(3, 4);
    const year = localString.substr(10, 5);
    return date + month + year;
  };

  const deleteHandler = () => {
    if (window.confirm(`Are you sure you want to delete '${getDate()}'?`)) {
      deleteDay(day.id);
    }
  };

  const styles = {
    container: {
      px: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    link: {
      flex: 1,
      display: 'flex',
    },
    start: {
      flex: 3,
      px: 1,
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
    middle: {
      flex: 2,
      px: 1,
    },
    last: {
      px: 1,
      pr: 2,
      flex: 3,
      display: 'flex',
      justifyContent: 'space-between',
    },
    delete: {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.secondary.dark,
    },
  };

  return (
    <TableRow
      sx={{
        display: 'flex',
        alignItems: 'cenetr',
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <Link
        onClick={() => setSingleDay(day.id)}
        to={`/day/${day.id}`}
        style={styles.link}
      >
        <TableCell sx={styles.start}>{getDate()}</TableCell>
        <TableCell sx={styles.middle}>Items: {day.items.length}</TableCell>
        <TableCell sx={styles.last}>
          <Typography>Total: </Typography>
          <Typography>{calculateTotal()}</Typography>
        </TableCell>
      </Link>
      <TableCell sx={{ p: 0 }}>
        <IconButton onClick={deleteHandler} aria-label='delete'>
          <DeleteIcon sx={styles.delete} fontSize='small' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DayRow;
