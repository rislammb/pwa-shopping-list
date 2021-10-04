import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TotalPrice = (props) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }}
  >
    {props.children}
    <Typography component='span' sx={{ fontWeight: 600, ml: 1, p: 1 }}>
      {props.day ? `Gross Total: ${props.total}` : `Total: ${props.total}`}
    </Typography>
  </Box>
);

export default TotalPrice;
