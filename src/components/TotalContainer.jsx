import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowBackRounded } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { totalFromDays } from '../utils';
import TotalPrice from './TotalPrice';

import StoreContext from '../store/StoreContext';

const TotalContainer = ({ detailsDay }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    state: { currentItems },
    toggleModal,
    clearCurrentItems,
  } = useContext(StoreContext);

  const getUnBuyedItems = () =>
    currentItems?.filter((item) => item.isBuyed !== true || item.price === '');

  const saveList = () => {
    if (getUnBuyedItems().length > 0) {
      window.alert('Your shopping not completed!');
    } else {
      toggleModal();
    }
  };

  const clearCurrentItemsFn = () => {
    if (window.confirm('Are you sure you want to delete all items?')) {
      clearCurrentItems();
    }
  };

  const drawerWidth = 240;
  const styles = {
    root: {
      bottom: 0,
      left: 0,
      width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
      mr: { md: `${drawerWidth}px` },
      background: theme.palette.background.paper,
    },
    delete: {
      mr: 1,
      color: theme.palette.secondary.main,
    },
  };

  return (
    <Box position='fixed' sx={styles.root}>
      {detailsDay ? (
        <TotalPrice detailsDay={detailsDay} total={totalFromDays([detailsDay])}>
          <IconButton onClick={() => navigate('/day')}>
            <ArrowBackRounded color='primary' />
          </IconButton>
        </TotalPrice>
      ) : (
        <TotalPrice total={totalFromDays([{ items: currentItems }])}>
          <Button
            sx={styles.delete}
            disabled={currentItems?.length < 1 ? true : false}
            onClick={clearCurrentItemsFn}
          >
            Clear all
          </Button>
          <Button
            color='primary'
            disabled={
              currentItems?.length < 1 || getUnBuyedItems().length > 0
                ? true
                : false
            }
            onClick={saveList}
          >
            Save Day
          </Button>
        </TotalPrice>
      )}
    </Box>
  );
};

export default TotalContainer;
