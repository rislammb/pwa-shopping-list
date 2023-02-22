import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React, { useContext, useEffect, useState } from 'react';

import DayRow from '../components/DayRow';
import PageTitle from '../components/PageTitle';
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
            {dayList.length > 0 ? (
              dayList.map((day) => <DayRow key={day.id} day={day} />)
            ) : (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ py: 5 }} align='center'>
                  There are no saved day!.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TotalContainer day dayList={dayList} />
    </Box>
  );
};

export default SavedDay;
