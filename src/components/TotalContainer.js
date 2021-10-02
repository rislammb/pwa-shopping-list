import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import TotalPrice from './TotalPrice';

import StoreContext from '../store/StoreContext';
import { Redirect } from 'react-router';

const TotalContainer = ({ day }) => {
  const {
    state: { currentItems, singleDay },
    toggleModal,
    clearCurrentItems,
  } = useContext(StoreContext);
  const theme = useTheme();

  const calculateTotal = () => {
    const newItems = day
      ? singleDay?.items?.filter((item) => +item.price > 0)
      : currentItems?.filter((item) => +item.price > 0);

    let totalPrice = 0;
    newItems?.map((item) => (totalPrice += +item.price));
    return totalPrice.toFixed(2);
  };

  const saveList = () => {
    const newItems = currentItems?.filter(
      (item) => item.isByed !== true || item.price === ''
    );
    if (newItems.length > 0) {
      window.alert('Your shopping not completed!');
    } else {
      toggleModal();
      // return <Redirect to='/day' />;
    }
  };

  const clearCurrentItemsFn = () => {
    if (window.confirm('Are you sure you want to delete all items?')) {
      clearCurrentItems();
    }
  };

  const styles = {
    delete: {
      mr: 2,
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.secondary.dark,
    },
  };

  return (
    <Box
      sx={{
        borderTop: '0.13px solid',
      }}
    >
      {day ? (
        <TotalPrice day={day} total={calculateTotal()} />
      ) : (
        <TotalPrice day={day} total={calculateTotal()}>
          <Button
            sx={styles.delete}
            disabled={currentItems?.length < 1 ? true : false}
            onClick={clearCurrentItemsFn}
          >
            Clear all
          </Button>
          <Button
            color='primary'
            disabled={currentItems?.length < 1 ? true : false}
            onClick={saveList}
          >
            Save Day
          </Button>
        </TotalPrice>
      )}
    </Box>
  );
};

export default TotalContainer;
