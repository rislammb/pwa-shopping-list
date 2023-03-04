import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TotalPrice = (props) => (
  <Box
    sx={{
      maxWidth: 540,
      mx: 'auto',
      px: 1,
    }}
  >
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}
    >
      {props.children}
      <Typography component='span' sx={{ ml: 1, p: 1 }}>
        {props.day ? (
          <Box>
            Gross Total:{' '}
            <Typography sx={{ fontWeight: 600 }} component={'span'}>
              {props.total}
            </Typography>
          </Box>
        ) : (
          <Box>
            Total:{' '}
            <Typography sx={{ fontWeight: 600 }} component={'span'}>
              {props.total}
            </Typography>
          </Box>
        )}
      </Typography>
    </Box>
  </Box>
);

export default TotalPrice;
