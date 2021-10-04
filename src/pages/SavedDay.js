import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import PageTitle from '../components/PageTitle';
import DayItem from '../components/DayItem';
import TotalContainer from '../components/TotalContainer';

import StoreContext from '../store/StoreContext';

const SavedDay = () => {
  const {
    state: { listAsDay },
  } = useContext(StoreContext);
  const [dayList, setDayList] = useState([]);

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
      <TotalContainer day dayList={dayList} />
    </Box>
  );
};

export default SavedDay;
