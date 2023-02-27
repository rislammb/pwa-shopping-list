import dayjs from 'dayjs';
import { useContext } from 'react';
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
  const {
    state: { listAsDay },
  } = useContext(StoreContext);

  const theme = useTheme();

  const detailsDay = listAsDay?.find((day) => day.id === dateId);

  return detailsDay ? (
    <Box sx={styles.container}>
      <PageTitle
        title={dayjs(detailsDay?.date).format('DD MMM YYYY')}
        details
      />
      <AddItem day />
      <ShoppingTable details />
      <TotalContainer details />
    </Box>
  ) : (
    <Box mt={3}>
      <Typography
        variant='h5'
        color={theme.palette.secondary.main}
        align='center'
      >
        Day not found!
      </Typography>
      <Typography mt={1} align='center'>
        Back to{' '}
        <Link
          style={{
            color: theme.palette.primary.main,
          }}
          to='/day'
          aria-label='Go to saved day'
        >
          Saved day
        </Link>
      </Typography>
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
