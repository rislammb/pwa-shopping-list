import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import PageTitle from '../components/PageTitle';
import DayItem from '../components/DayItem';
import TotalPrice from '../components/TotalPrice';

import StoreContext from '../store/StoreContext';

const SavedDay = () => {
  const {
    state: { listAsDay },
    clearAllDays,
  } = useContext(StoreContext);
  const theme = useTheme();
  const [dayList, setDayList] = useState([]);

  const calculateGrossTotal = () => {
    let grossTotal = 0;
    dayList.map((day) => {
      return day.items.map((item) => (grossTotal += +item.price));
    });
    return grossTotal.toFixed(2);
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

  useEffect(() => {
    const newList = listAsDay.sort(function (a, b) {
      const keyA = a.date;
      const keyB = b.date;

      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });
    setDayList(newList);
  }, [listAsDay]);

  const styles = {
    container: { flexGrow: 1, display: 'flex', flexDirection: 'column' },
    listContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: 1,
    },
    center: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    delete: {
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.secondary.dark,
    },
  };

  return (
    <Box sx={styles.container}>
      <PageTitle title='Day List' />
      <List sx={styles.listContainer}>
        {dayList.length > 0 ? (
          dayList.map((day) => <DayItem key={day.id} day={day} />)
        ) : (
          <Typography sx={styles.center}>There are no saved day!.</Typography>
        )}
      </List>
      <TotalPrice total={calculateGrossTotal()} days>
        <Button
          onClick={clearAllHandler}
          disabled={listAsDay.length < 1 ? true : false}
          style={styles.delete}
        >
          Clear all days
        </Button>
      </TotalPrice>
    </Box>
  );
};

export default SavedDay;
