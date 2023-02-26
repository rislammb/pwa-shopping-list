import { IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import { useTheme } from '@mui/material/styles';

import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';

import DayRow from '../components/DayRow';
import PageTitle from '../components/PageTitle';

import StoreContext from '../store/StoreContext';

export default function ControlledAccordions() {
  const theme = useTheme();

  const {
    state: { listAsDay },
  } = useContext(StoreContext);
  const [dayListAsMonth, setDayListAsMonth] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deleteMonthHandler = (monthName) => {
    console.log(monthName);
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
    setExpanded(listAsMonth[0].name);
  }, [listAsDay]);

  const styles = {
    // container: {
    //   flex: 1,
    //   display: 'flex',
    //   pl: 0,
    //   pr: 1,
    // },
    // link: {
    //   flex: 1,
    //   color: 'inherit',
    //   display: 'flex',
    // },
    // date: {
    //   flex: 3,
    //   color: theme.palette.primary.main,
    // },
    // items: {
    //   flex: 2,
    //   px: 1,
    // },
    // total: {
    //   flex: 4,
    //   display: 'flex',
    //   justifyContent: 'space-between',
    // },
    delete: {
      color: theme.palette.secondary.main,
    },
  };

  return (
    <div>
      <PageTitle title='Day List' />
      {dayListAsMonth.length > 0 &&
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
                // aria-controls='panel1bh-content'
                // id='panel1bh-header'
                sx={{
                  '& .Mui-expanded': {
                    margin: 0,
                  },
                }}
              >
                <Typography sx={{ textAlign: 'center', flex: 1 }}>
                  {month.name}
                </Typography>
                <p>Total:</p>
              </AccordionSummary>
            </div>
            <AccordionDetails>
              {month.days.map((day) => (
                <DayRow key={day.date} day={day} />
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
    </div>
  );
}
