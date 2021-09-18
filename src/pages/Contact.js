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
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
  card: {
    marginTop: 27,
    width: 330,
    maxWidth: '90%',
    margin: 'auto',
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

const Contact = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}></div>
      <Card className={classes.card}>
        <CardHeader className={classes.header} title='Contact' />
        <CardContent>
          <Typography className={classes.fontSize}>
            Mail to:{' '}
            <Link className={classes.link} href='mailto:rislammb@gmail.com'>
              rislammb@gmail.com
            </Link>
          </Typography>
          <Typography className={classes.fontSize}>
            Facebook:{' '}
            <Link
              className={classes.link}
              href='https://www.facebook.com/rislammb'
            >
              facebook/rislammb
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
