import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Check from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import Undo from '@mui/icons-material/Undo';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import ItemPrice from './ItemPrice';

import StoreContext from '../store/StoreContext';

const ShoppingRow = ({ item, index, detailsDay }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { deleteItem, toggleByed, deleteItemFromDay, deleteDay } =
    useContext(StoreContext);

  const dayItemDelete = () => {
    if (window.confirm(`Are you sure you want to delete '${item.itemName}'?`)) {
      if (detailsDay.items.length > 1) {
        deleteItemFromDay(detailsDay.id, item.id);
      } else {
        deleteDay(detailsDay.id);
        return navigate('/day');
      }
    }
  };

  const styles = {
    name: {
      flex: 5,
      px: 1,
      fontWeight: '600',
      color: theme.palette.primary.main,
    },
    delete: {
      color: theme.palette.secondary.main,
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
      <TableCell sx={{ p: 0 }}>
        {detailsDay ? (
          <IconButton onClick={dayItemDelete} aria-label='Delete'>
            <DeleteIcon sx={styles.delete} fontSize='small' />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => toggleByed(item.id)}
            aria-label={item.isBuyed ? 'Undo' : 'Check'}
          >
            {item.isBuyed ? <Undo /> : <Check />}
          </IconButton>
        )}
      </TableCell>
      <TableCell sx={{ px: 1 }}>
        {index + 1 < 10 ? `0${index + 1}` : index + 1}
      </TableCell>
      <TableCell component='th' sx={styles.name} scope='row'>
        {item.itemName}
      </TableCell>
      <TableCell sx={{ flex: 3, px: 1 }}>{item.amount}</TableCell>
      <TableCell align='right' sx={{ p: 0, width: 57 }}>
        {detailsDay ? (
          <Typography align='right'>{item.price}</Typography>
        ) : item.isBuyed ? (
          <ItemPrice item={item} />
        ) : (
          <IconButton onClick={() => deleteItem(item.id)} aria-label='delete'>
            <DeleteIcon sx={styles.delete} fontSize='small' />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  );
};

export default ShoppingRow;
