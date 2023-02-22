import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import DatePickerComp from './DatePickerComp';

import StoreContext from '../store/StoreContext';

const ModalComp = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const {
    state: { currentItems, listAsDay, visibleModal },
    toggleModal,
    addDay,
    clearCurrentItems,
  } = useContext(StoreContext);
  const [date, setDate] = useState(new Date());

  const addDayFn = () => {
    const exist = listAsDay.find(
      (day) =>
        new Date(day.date).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
    );

    if (exist) {
      alert('This day is already exist!');
      return;
    } else {
      addDay(date.toISOString(), currentItems);
      clearCurrentItems();
      toggleModal();
      return navigate('/day');
    }
  };

  useEffect(() => {
    setDate(new Date());
  }, [toggleModal]);

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={visibleModal}
      onClose={toggleModal}
      closeAfterTransition
    >
      <Fade in={visibleModal}>
        <Box sx={{ ...styles.card, bgcolor: theme.palette.background.default }}>
          <Typography variant='h5' sx={styles.title} color='primary'>
            Save this list on Database
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            Save this list for Date:
          </Typography>
          <Box sx={styles.datePicker}>
            <DatePickerComp date={date} setDate={setDate} />
          </Box>
          <Typography sx={{ color: '#c35', textAlign: 'center' }}>
            If you save this list, your current page would clear!
          </Typography>
          <Box sx={styles.btnContainer}>
            <Button
              size='small'
              variant='contained'
              color='error'
              onClick={toggleModal}
            >
              Cancel
            </Button>
            <Button variant='contained' color='primary' onClick={addDayFn}>
              Save
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
export default ModalComp;

const styles = {
  card: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: 260,
    boxShadow: 12,
    borderRadius: 2,
    py: 3,
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    mb: 1,
    textAlign: 'center',
  },
  datePicker: {
    my: 1,
    '& input': {
      textAlign: 'center',
    },
  },
  btnContainer: {
    mt: 1,
    display: 'flex',
    gap: 1,
  },
};
