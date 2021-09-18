import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    maxWidth: '500px',
    width: '100%',
    margin: 'auto',
    textAlign: 'right',
  },
  total: { fontWeight: 'bold', color: '#333' },
}));

const TotalPrice = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.children}
      <Typography component='span' className={classes.total}>
        {props.days ? `Gross Total: ${props.total}` : `Total: ${props.total}`}
      </Typography>
    </div>
  );
};

export default TotalPrice;
