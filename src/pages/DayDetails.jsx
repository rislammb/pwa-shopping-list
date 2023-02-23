import dayjs from 'dayjs';
import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AddItem from '../components/AddItem';
import PageTitle from '../components/PageTitle';
import ShoppingTable from '../components/ShoppingTable';
import TotalContainer from '../components/TotalContainer';
import StoreContext from '../store/StoreContext';

const DayDetails = () => {
  let { dateId } = useParams();
  const theme = useTheme();

  const {
    state: { singleDay },
    setSingleDay,
  } = useContext(StoreContext);

  useEffect(() => {
    setSingleDay(dateId);
  }, [dateId]);

  return singleDay ? (
    <Box sx={styles.container}>
      <PageTitle title={dayjs(singleDay?.date).format('DD MMM YYYY')} details />
      <AddItem day />
      <ShoppingTable details />
      <TotalContainer details />
    </Box>
  ) : (
    <Box sx={{ margin: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        variant='h5'
        color={
          theme.palette.mode === 'dark'
            ? theme.palette.secondary.light
            : theme.palette.secondary.main
        }
        align='center'
      >
        Day not found!
      </Typography>
      <Link
        style={{
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          textAlign: 'center',
          fontWeight: '600',
        }}
        to='/day'
      >
        Back
      </Link>
    </Box>
  );
};

export default DayDetails;

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};
