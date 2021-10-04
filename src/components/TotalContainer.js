import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { ArrowBackRounded } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import TotalPrice from './TotalPrice';

import StoreContext from '../store/StoreContext';

const TotalContainer = ({ day, dayList, details }) => {
  const history = useHistory();
  const {
    state: { currentItems, listAsDay, singleDay },
    toggleModal,
    clearCurrentItems,
    clearAllDays,
  } = useContext(StoreContext);
  const theme = useTheme();

  const calculateTotal = () => {
    if (day) {
      let grossTotal = 0;
      dayList.map((day) => {
        return day.items.map((item) => (grossTotal += +item.price));
      });
      return grossTotal.toFixed(2);
    } else {
      const newItems = details
        ? singleDay?.items?.filter((item) => +item.price > 0)
        : currentItems?.filter((item) => +item.price > 0);

      let totalPrice = 0;
      newItems?.map((item) => (totalPrice += +item.price));
      return totalPrice.toFixed(2);
    }
  };

  const saveList = () => {
    const newItems = currentItems?.filter(
      (item) => item.isByed !== true || item.price === ''
    );
    if (newItems.length > 0) {
      window.alert('Your shopping not completed!');
    } else {
      toggleModal();
    }
  };

  const clearCurrentItemsFn = () => {
    if (window.confirm('Are you sure you want to delete all items?')) {
      clearCurrentItems();
    }
  };

  const clearAllHandler = () => {
    if (window.confirm('Are you sure you want to delete all days?')) {
      if (
        window.confirm('If you delete all days your data will never back!!!')
      ) {
        clearAllDays();
      }
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
        <TotalPrice day={day} total={calculateTotal()}>
          <Button
            onClick={clearAllHandler}
            disabled={listAsDay.length < 1 ? true : false}
            style={styles.delete}
          >
            Clear all days
          </Button>
        </TotalPrice>
      ) : details ? (
        <TotalPrice details={details} total={calculateTotal()}>
          <IconButton onClick={() => history.push('/day')}>
            <ArrowBackRounded color='primary' />
          </IconButton>
        </TotalPrice>
      ) : (
        <TotalPrice total={calculateTotal()}>
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
