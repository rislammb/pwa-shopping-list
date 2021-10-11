import React, { useState, useContext, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import ShoppingRow from './ShoppingRow';

import StoreContext from '../store/StoreContext';

const ShoppingTable = ({ details }) => {
  const [items, setItems] = useState([]);
  const {
    state: { singleDay, currentItems },
  } = useContext(StoreContext);

  useEffect(() => {
    async function loadItems() {
      if (details) {
        await setItems(singleDay?.items);
      } else {
        await setItems(currentItems);
      }
    }
    loadItems();
  }, [details, singleDay?.items, currentItems]);

  return (
    <TableContainer
      sx={{
        mt: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Table size='small' aria-label='a dense table'>
        <TableBody>
          {items?.length > 0 ? (
            items.map((item, index) => (
              <ShoppingRow
                key={item.id}
                item={item}
                index={index}
                details={details}
              />
            ))
          ) : (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ py: 5 }} align='center'>
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
