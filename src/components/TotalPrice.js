import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TotalPrice = (props) => (
  <Box
    sx={{
      boxShadow: '0px -0.5px 0px #999',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      maxWidth: 470,
      mx: 'auto',
    }}
  >
    {props.children}
    <Typography component='span' sx={{ fontWeight: 500, ml: 1, p: 1 }}>
      {props.day ? `Gross Total: ${props.total}` : `Total: ${props.total}`}
    </Typography>
  </Box>
);

export default TotalPrice;
