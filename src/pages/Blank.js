import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
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
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
    fontSize: {
      fontSize: 17,
      mt: 3,
      mb: 1,
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.secondary.light
          : theme.palette.secondary.dark,
    },
  };

  return (
    <Box sx={styles.root}>
      <PageTitle title='Blank Page' />
      <Typography sx={styles.fontSize}>This page not found.</Typography>
      <Typography>
        Please go back to{' '}
        <Link style={styles.link} to='/'>
          Home
        </Link>
      </Typography>
    </Box>
  );
};

export default Blank;
