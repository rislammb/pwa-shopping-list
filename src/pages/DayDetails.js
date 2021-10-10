import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';

import PageTitle from '../components/PageTitle';
import ShoppingList from '../components/ShoppingList';
import TotalContainer from '../components/TotalContainer';
import AddItem from '../components/AddItem';
import StoreContext from '../store/StoreContext';

const DayDetails = (props) => {
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
    setSingleDay(props.match.params.dateId);
  }, [props.match.params.dateId]);

  return (
    <Box sx={styles.container}>
      <PageTitle title={`Date: ${getDate()}`} />
      <AddItem day />
      <ShoppingList day />
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
