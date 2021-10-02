import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const PageTitle = ({ title }) => {
  const theme = useTheme();

  const styles = {
    title: {
      textAlign: 'center',
      my: 1,
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.primary.main
          : theme.palette.primary.dark,
    },
  };
  return (
    <Typography variant='h5' sx={styles.title}>
      {title}
    </Typography>
  );
};
export default PageTitle;
