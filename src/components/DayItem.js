import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

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
      justifyContent: 'space-between',
    },
    link: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      color: 'inherit',
    },
    delete: {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.secondary.dark,
    },
  };

  return (
    <ListItem sx={styles.container}>
      <Link
        onClick={() => setSingleDay(day.id)}
        to={`/day/${day.id}`}
        style={styles.link}
      >
        <ListItemText primary={getDate()} />
        <ListItemText primary={`Items: ${day.items.length}`} />
        <ListItemText primary={`Total: ${calculateTotal()}`} />
      </Link>
      <IconButton onClick={deleteHandler} edge='end' aria-label='delete'>
        <DeleteIcon sx={styles.delete} fontSize='small' />
      </IconButton>
    </ListItem>
  );
};

export default DayItem;
