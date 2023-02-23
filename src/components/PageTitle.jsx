import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = ({ title, details }) => {
  const theme = useTheme();

  const styles = {
    title: {
      textAlign: 'center',
      my: 1,
      color: theme.palette.primary.main,
    },
  };
  return details ? (
    <Typography variant='h5' sx={styles.title}>
      <Link to='/day' style={{ color: 'inherit' }} aria-label='Go day list'>
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
