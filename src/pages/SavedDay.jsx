import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { useContext, useEffect, useState } from 'react';

import DayRow from '../components/DayRow';
import PageTitle from '../components/PageTitle';

import StoreContext from '../store/StoreContext';

const SavedDay = () => {
  const {
    state: { listAsDay },
  } = useContext(StoreContext);
  const [dayListAsMonth, setDayListAsMonth] = useState([]);
  const [opendMonthIndex, setOpendMonthIndex] = useState(0);
  const [opendMonth, setOpendMonth] = useState({});

  useEffect(() => {
    const newList = listAsDay.sort(function (a, b) {
      const keyA = a.date;
      const keyB = b.date;

      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });

    const listAsMonth = newList.reduce((acc, cur) => {
      const index = acc.findIndex((mon) => mon.name === cur.month);

      if (index > -1) {
        acc[index].days.push(cur);
      } else {
        acc.push({
          name: cur.month,
          days: [cur],
        });
      }

      return acc;
    }, []);

    setDayListAsMonth(listAsMonth);
    setOpendMonth(listAsMonth[opendMonthIndex]);
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
      <dl>
        {dayListAsMonth.length > 0 &&
          dayListAsMonth.map((month) => (
            <li>
              <p>{month.name}</p>
              {month.days.length > 0 &&
                month.days.map((day) => <p>{day.date}</p>)}
            </li>
          ))}
      </dl>
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
            {opendMonth.days?.length > 0 ? (
              opendMonth.days.map((day) => <DayRow key={day.id} day={day} />)
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
      {/* <TotalContainer day dayList={opendMonth.days} /> */}
    </Box>
  );
};

export default SavedDay;
