import React, { useState, useContext, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import ShoppingRow from './ShoppingRow';

import StoreContext from '../store/StoreContext';

const ShoppingTable = ({ day }) => {
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
    <TableContainer
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Table size='small' aria-label='a dense table'>
        <TableBody>
          {items?.length > 0 ? (
            items.map((item, index) => (
              <ShoppingRow key={item.id} item={item} index={index} day={day} />
            ))
          ) : (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>
                There are no shopping list item.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ShoppingTable;
