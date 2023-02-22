import AddItem from '../components/AddItem';
import PageTitle from '../components/PageTitle';
import ShoppingTable from '../components/ShoppingTable';
import TotalContainer from '../components/TotalContainer';

import Box from '@mui/material/Box';

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
