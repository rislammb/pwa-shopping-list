import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const TotalPrice = (props) => (
  <Box
    sx={{
      maxWidth: 470,
      mx: 'auto',
      px: 1,
    }}
  >
    <Divider />
    <Box
      sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
    >
      {props.children}
      <Typography component='span' sx={{ fontWeight: 500, ml: 1, p: 1 }}>
        {props.day ? `Gross Total: ${props.total}` : `Total: ${props.total}`}
      </Typography>
    </Box>
  </Box>
);

export default TotalPrice;
