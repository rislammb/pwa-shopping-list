import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Undo from '@mui/icons-material/Undo';
import Check from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

import ItemPrice from './ItemPrice';
import StoreContext from '../store/StoreContext';
import { Typography } from '@mui/material';

const ShoppingRow = ({ item, index, day }) => {
  const history = useHistory();
  const {
    state: { singleDay },
    deleteItem,
    toggleByed,
    deleteItemFromDay,
    deleteDay,
  } = useContext(StoreContext);
  const theme = useTheme();

  const dayItemDelete = () => {
    if (
      window.confirm(`Are you sure you want to delete  '${item.itemName}'?`)
    ) {
      if (singleDay.items.length > 1) {
        deleteItemFromDay(singleDay.id, item.id);
      } else {
        deleteDay(singleDay.id);
        return history.push('/day');
      }
    }
  };

  const styles = {
    delete: {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.secondary.dark,
    },
  };

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell sx={{ p: 0 }}>
        {day ? (
          <IconButton onClick={dayItemDelete} edge='start' aria-label='delete'>
            <DeleteIcon sx={styles.delete} fontSize='small' />
          </IconButton>
        ) : (
          <IconButton onClick={() => toggleByed(item.id)}>
            {item.isByed ? <Undo /> : <Check />}
          </IconButton>
        )}
      </TableCell>
      <TableCell>{index + 1 < 10 ? `0${index + 1}` : index + 1}</TableCell>
      <TableCell component='th' scope='row' color='primary'>
        {item.itemName}
      </TableCell>
      <TableCell align='right'>{item.amount}</TableCell>
      <TableCell align='right' sx={{ p: 0, width: 63 }}>
        {day ? (
          <Typography align='right'>{item.price}</Typography>
        ) : item.isByed ? (
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
