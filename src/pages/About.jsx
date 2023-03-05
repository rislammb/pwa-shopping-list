import { Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import PageTitle from '../components/PageTitle';

const Contact = () => {
  const styles = {
    root: {
      mt: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 2,
    },
  };

  return (
    <Box sx={styles.root}>
      <PageTitle title='About this App' />
      <List>
        <ListItem>
          <ListItemText
            primary={`This is an excellent Progressive Web App (PWA) for tracking shopping or expenses. The
          user of this app can save the list of necessary shopping or expenses
          of his daily life here and track which shopping or expenses have been
          completed and which are left.`}
          />
        </ListItem>
        <Divider variant='middle' />
        <ListItem>
          <ListItemText
            primary={`After shopping or spending, user can save day-wise expenses and view
            those days separately by month. Through this, the user can save the
            calculation of his every money spent.`}
          />
        </ListItem>
        <Divider variant='middle' />
        <ListItem>
          <ListItemText
            primary={`This app can be browsed in any browser as a website and installed as a
            desktop app on a computer and an Android and iOS app on mobile. The
            app can be used online as well as offline after the 1st time browsing.`}
          />
        </ListItem>
        <Divider variant='middle' />
        <ListItem>
          <ListItemText
            primary={`All data is stored in local storage so there is no fear of data leakage and no need to register or login.`}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Contact;
