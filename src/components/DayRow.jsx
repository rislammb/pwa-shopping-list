import { useContext } from 'react';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

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
      flex: 1,
      display: 'flex',
      pl: 0,
      pr: 1,
    },
    link: {
      flex: 1,
      color: 'inherit',
      display: 'flex',
    },
    date: {
      flex: 3,
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
    items: {
      flex: 2,
      px: 1,
    },
    total: {
      flex: 4,
      display: 'flex',
      justifyContent: 'space-between',
    },
    delete: {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.secondary.main,
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
      <TableCell sx={styles.container}>
        <Link
          onClick={() => setSingleDay(day.id)}
          to={`/day/${day.id}`}
          style={styles.link}
        >
          <Typography sx={styles.date}>{getDate()}</Typography>
          <Typography sx={styles.items}>Items: {day.items.length}</Typography>
          <Box sx={styles.total}>
            <Typography>Total: </Typography>
            <Typography>{calculateTotal()}</Typography>
          </Box>
        </Link>
      </TableCell>

      <TableCell sx={{ p: 0 }}>
        <IconButton onClick={deleteHandler} aria-label='delete'>
          <DeleteIcon sx={styles.delete} fontSize='small' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default DayRow;
