import React from 'react';
import Box from '@mui/material/Box';

import PageTitle from '../components/PageTitle';
import AddItem from '../components/AddItem';
import ShoppingTable from '../components/ShoppingTable';
import TotalContainer from '../components/TotalContainer';

const Home = () => {
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <PageTitle title='Shopping List' />
        <AddItem />
        <ShoppingTable />
      </Box>
      <TotalContainer />
    </Box>
  );
};

export default Home;
