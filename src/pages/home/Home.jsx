import React from 'react';
import alterstateLogo from '../../assets/alterstate_logo.png'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles({
  list: {
    width: 250,
  },

  fullList: {
    width: 'auto',
  },

  logoutContainer: {
    marginTop: "auto",
    paddingBottom: "0",
    position: "fixed",
    width: drawerWidth,
    bottom: 0
  },

  img: {
    width: "120px",
    height: "30px",
    marginTop: "6px",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <AppBar
            position="fixed"
          >
            <Toolbar>
              <IconButton
                color="secondary"
                aria-label="open drawer"
                size='medium'
                onClick={toggleDrawer(anchor, true)}
                anchor="left"
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                <img src={alterstateLogo} className={classes.img}/>
              </Typography>
            </Toolbar>
          </AppBar>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <List className={classes.list}>
              <p>AlterState</p> 
              <Divider />
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon >{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <List className={classes.logoutContainer}>
              <Divider />
              <ListItem
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Button>Logout</Button>
              </ListItem>
            </List>
            <Divider />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
