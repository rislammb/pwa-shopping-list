import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import PageTitle from '../components/PageTitle';

const Contact = () => {
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
      my: 1,
    },
  };

  return (
    <Box sx={styles.root}>
      <PageTitle title='Contact' />
      <Typography sx={styles.fontSize}>
        Mail to:{' '}
        <Link sx={styles.link} href='mailto:rislammb@gmail.com'>
          rislammb@gmail.com
        </Link>
      </Typography>
      <Typography sx={styles.fontSize}>
        Facebook:{' '}
        <Link style={styles.link} href='https://www.facebook.com/rislammb'>
          facebook/rislammb
        </Link>
      </Typography>
    </Box>
  );
};

export default Contact;
