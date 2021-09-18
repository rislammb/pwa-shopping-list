import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  card: {
    marginTop: 27,
    width: 330,
    maxWidth: '90%',
    backgroundColor:
      theme.palette.type === 'light' ? 'rgba(255,255,255,0.3)' : '',
  },
  header: {
    textAlign: 'center',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  link: {
    textDecoration: 'none',
    color:
      theme.palette.type === 'light'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
  },
  divider: {
    margin: '21px 0',
  },
  fontSize: {
    fontSize: 17,
  },
}));

const SavedDay = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}></div>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title='Saved Day' />
        <CardContent>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
          earum ipsam quaerat saepe expedita dignissimos sit repellat iusto
          voluptatibus sequi. Pariatur harum incidunt eligendi doloribus.
        </CardContent>
      </Card>
    </div>
  );
};

export default SavedDay;
