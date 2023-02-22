import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Box } from '@mui/material';

import AddItem from '../components/AddItem';
import PageTitle from '../components/PageTitle';
import ShoppingTable from '../components/ShoppingTable';
import TotalContainer from '../components/TotalContainer';
import StoreContext from '../store/StoreContext';

const DayDetails = () => {
  let { dateId } = useParams();

  const {
    state: { singleDay },
    setSingleDay,
  } = useContext(StoreContext);

  const getDate = () => {
    const localString = new Date(singleDay?.date).toDateString();
    const date = localString.substr(8, 2);
    const month = localString.substr(3, 4);
    const year = localString.substr(10, 5);
    return date + month + year;
  };

  useEffect(() => {
    setSingleDay(dateId);
  }, []);

  return (
    <Box sx={styles.container}>
      <PageTitle title={`Date: ${getDate()}`} details />
      <AddItem day />
      <ShoppingTable details />
      <TotalContainer details />
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
