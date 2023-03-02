import { useContext } from 'react';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import StoreContext from '../store/StoreContext';
import { getDate, totalFromDays } from '../utils';

const DayRow = ({ day }) => {
  const { setSingleDay, deleteDay } = useContext(StoreContext);
  const theme = useTheme();

  const deleteHandler = () => {
    if (
      window.confirm(`Are you sure you want to delete '${getDate(day?.date)}'?`)
    ) {
      deleteDay(day.id);
    }
  };

  const styles = {
    root: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    link: {
      flex: 1,
      color: 'inherit',
      display: 'flex',
    },
    date: {
      flex: 3,
      color: theme.palette.primary.main,
    },
    items: {
      fontSize: '0.9rem',
      flex: 2,
    },
    total: {
      flex: 3,
      fontSize: '0.9rem',
      display: 'flex',
      gap: '4px',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    delete: {
      color: theme.palette.secondary.main,
    },
  };

  return (
    <Box sx={styles.root}>
      <Link
        onClick={() => setSingleDay(day.id)}
        to={`/day/${day.id}`}
        style={styles.link}
        aria-label='Go day details'
      >
        <Typography sx={styles.date}>{getDate(day?.date)}</Typography>
        <Typography sx={styles.items}>Items: {day.items.length}</Typography>
        <Box sx={styles.total}>
          <Typography sx={{ fontSize: 'inherit' }}>Total: </Typography>
          <Typography sx={{ fontSize: 'inherit' }}>
            {totalFromDays([day])}
          </Typography>
        </Box>
      </Link>

      <IconButton onClick={deleteHandler} aria-label='Delete day'>
        <DeleteIcon sx={styles.delete} fontSize='small' />
      </IconButton>
    </Box>
  );
};

export default DayRow;
