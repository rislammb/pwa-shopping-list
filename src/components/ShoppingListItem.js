import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Undo from '@mui/icons-material/Undo';
import Check from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

import ItemPrice from './ItemPrice';
import StoreContext from '../store/StoreContext';

const ShoppingListItem = ({ item, index, day }) => {
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
    <ListItem
      sx={{
        px: 0,
      }}
    >
      {day ? (
        <IconButton onClick={dayItemDelete} edge='start' aria-label='delete'>
          <DeleteIcon sx={styles.delete} fontSize='small' />
        </IconButton>
      ) : (
        <IconButton onClick={() => toggleByed(item.id)}>
          {item.isByed ? <Undo /> : <Check />}
        </IconButton>
      )}
      <ListItemText
        sx={{ width: '5px', textAlign: 'center' }}
        primary={index + 1 < 10 ? `0${index + 1}` : index + 1}
      />
      <Typography color='primary' sx={{ flex: 5, fontWeight: 600 }}>
        {item.itemName}
      </Typography>
      <Typography sx={{ flex: 3 }}>{item.amount}</Typography>

      <Box sx={{ width: 63, textAlign: 'center' }}>
        {day ? (
          <Typography sx={{ textAlign: 'right' }}>{item.price}</Typography>
        ) : item.isByed ? (
          <ItemPrice item={item} />
        ) : (
          <IconButton
            onClick={() => deleteItem(item.id)}
            edge='end'
            aria-label='delete'
          >
            <DeleteIcon sx={styles.delete} fontSize='small' />
          </IconButton>
        )}
      </Box>
    </ListItem>
  );
};

export default ShoppingListItem;
