import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import StoreContext from '../store/StoreContext';

const DayItem = ({ day }) => {
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
      alignItems: 'center',
      color: 'inherit',
    },
    start: { flex: 3 },
    middle: {
      flex: 2,
      mx: 1,
    },
    last: {
      flex: 3,
      display: 'flex',
      justifyContent: 'space-between',
    },
    delete: {
      ml: 1,
      color: theme.palette.secondary.main,
    },
  };

  return (
    <ListItem sx={styles.container}>
      <Link
        onClick={() => setSingleDay(day.id)}
        to={`/day/${day.id}`}
        style={styles.link}
        aria-label='Go day details'
      >
        <Typography sx={styles.start}>{getDate()}</Typography>
        <Typography sx={styles.middle}>Items: {day.items.length}</Typography>
        <Box sx={styles.last}>
          <Typography>Total: </Typography>
          <Typography>{calculateTotal()}</Typography>
        </Box>
      </Link>
      <IconButton onClick={deleteHandler} edge='end' aria-label='delete'>
        <DeleteIcon sx={styles.delete} fontSize='small' />
      </IconButton>
    </ListItem>
  );
};

export default DayItem;
