import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import DayRow from '../components/DayRow';
import StoreContext from '../store/StoreContext';
import { calculateMonthTotal } from '../utils';

const SavedDays = () => {
  const theme = useTheme();
  const {
    state: { listAsDay },
    deleteMonth,
  } = useContext(StoreContext);

  const [dayListAsMonth, setDayListAsMonth] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteMonthHandler = (monthName) => {
    if (window.confirm(`Are you sure you want to delete '${monthName}'?`)) {
      if (window.confirm('If you delete it once, it will never come back!')) {
        deleteMonth(monthName);
      }
    }
  };

  useEffect(() => {
    const newList = listAsDay.sort(function (a, b) {
      const keyA = a.date;
      const keyB = b.date;

      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });

    const listAsMonth = newList.reduce((acc, cur) => {
      const index = acc.findIndex((mon) => mon.name === cur.month);

      if (index > -1) {
        acc[index].days.push(cur);
      } else {
        acc.push({
          name: cur.month,
          days: [cur],
        });
      }

      return acc;
    }, []);

    setDayListAsMonth(listAsMonth);
    setExpanded(listAsMonth[0]?.name);
  }, [listAsDay]);

  const styles = {
    root: {
      marginTop: theme.spacing(2),
    },
    delete: {
      color: theme.palette.secondary.main,
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  };

  return (
    <Box sx={styles.root}>
      {dayListAsMonth.length > 0 ? (
        dayListAsMonth.map((month) => (
          <Accordion
            expanded={expanded === month.name}
            onChange={handleChange(month.name)}
            key={month.name}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0px 16px',
              }}
            >
              <IconButton
                onClick={() => deleteMonthHandler(month.name)}
                aria-label='Delete Month'
                title='Delete Month'
              >
                <DeleteIcon sx={styles.delete} fontSize='small' />
              </IconButton>
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls={`${month.name}-content`}
                id={`${month.name}header`}
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',

                  '&.Mui-expanded': {
                    minHeight: '30px',
                  },

                  '& .MuiAccordionSummary-content.Mui-expanded': {
                    margin: '8px 0px',
                    alignItems: 'center',
                  },
                }}
              >
                <Typography
                  sx={{
                    textAlign: 'center',
                    flex: 1,
                    color: theme.palette.primary.main,
                    fontSize: '1.2rem',
                    fontWeight: 400,
                  }}
                >
                  {month.name}
                </Typography>
                <Typography>
                  Total: {calculateMonthTotal(month.days)}
                </Typography>
              </AccordionSummary>
            </div>
            <AccordionDetails
              sx={{
                padding: { xs: '8px', sm: '8px 16px 16px' },

                '& > div': {
                  borderTop: '1px solid rgba(125, 125, 125, 0.15)',
                },
              }}
            >
              {month.days.map((day) => (
                <DayRow key={day.date} day={day} />
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Box mt={3}>
          <Typography variant='h5' align='center'>
            There is no saved day!
          </Typography>
          <Typography align='center' mt={1}>
            Go back to{' '}
            <Link style={styles.link} to='/'>
              Home
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SavedDays;
