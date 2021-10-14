import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const PageTitle = ({ title, details }) => {
  const theme = useTheme();

  const styles = {
    title: {
      textAlign: 'center',
      my: 1,
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
  };
  return details ? (
    <Typography variant='h5' sx={styles.title}>
      <Link to='/day' style={{ color: 'inherit' }}>
        {title}
      </Link>
    </Typography>
  ) : (
    <Typography variant='h5' sx={styles.title}>
      {title}
    </Typography>
  );
};
export default PageTitle;
