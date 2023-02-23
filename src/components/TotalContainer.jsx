import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowBackRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import TotalPrice from './TotalPrice';

import StoreContext from '../store/StoreContext';

const TotalContainer = ({ day, dayList, details }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    state: { currentItems, listAsDay, singleDay },
    toggleModal,
    clearCurrentItems,
    clearAllDays,
  } = useContext(StoreContext);

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

  const getUnBuyedItems = () =>
    currentItems?.filter((item) => item.isByed !== true || item.price === '');

  const saveList = () => {
    if (getUnBuyedItems().length > 0) {
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

  const drawerWidth = 240;
  const styles = {
    root: {
      bottom: 0,
      left: 0,
      width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
      mr: { md: `${drawerWidth}px` },
      background: theme.palette.background.paper,
    },
    delete: {
      mr: 1,
      color: theme.palette.secondary.main,
    },
  };

  return (
    <Box position='fixed' sx={styles.root}>
      {day ? (
        <TotalPrice day={day} total={calculateTotal()}>
          <Button
            onClick={clearAllHandler}
            disabled={listAsDay.length < 1 ? true : false}
            sx={styles.delete}
          >
            Clear all days
          </Button>
        </TotalPrice>
      ) : details ? (
        <TotalPrice details={details} total={calculateTotal()}>
          <IconButton onClick={() => navigate('/day')}>
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
            disabled={
              currentItems?.length < 1 || getUnBuyedItems().length > 0
                ? true
                : false
            }
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
