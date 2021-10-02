import React, { useState, useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

import ShoppingListItem from './ShoppingListItem';

import StoreContext from '../store/StoreContext';

const ShoppingList = ({ day }) => {
  const [items, setItems] = useState([]);
  const {
    state: { singleDay, currentItems },
  } = useContext(StoreContext);

  useEffect(() => {
    async function loadItems() {
      if (day) {
        await setItems(singleDay?.items);
      } else {
        await setItems(currentItems);
      }
    }
    loadItems();
  }, [day, singleDay?.items, currentItems]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {items?.length > 0 ? (
        <List dense>
          {items?.map((item, index) => (
            <ShoppingListItem
              key={item.id}
              item={item}
              index={index}
              day={day}
            />
          ))}
        </List>
      ) : (
        <Typography sx={styles.center}>
          There are no shopping list item.
        </Typography>
      )}
    </Box>
  );
};

export default ShoppingList;

const styles = {
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
