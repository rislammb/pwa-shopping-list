import React from 'react';
import { Link } from 'react-router-dom';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import PageTitle from '../components/PageTitle';

const Blank = () => {
  const theme = useTheme();

  const styles = {
    root: {
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    fontSize: {
      fontSize: 17,
      mt: 3,
      mb: 1,
      color: theme.palette.secondary.main,
    },
  };

  return (
    <Box sx={styles.root}>
      <PageTitle title='Blank Page' />
      <Typography sx={styles.fontSize}>This page not found.</Typography>
      <Typography>
        Go back to{' '}
        <Link style={styles.link} to='/'>
          Home
        </Link>
      </Typography>
    </Box>
  );
};

export default Blank;
