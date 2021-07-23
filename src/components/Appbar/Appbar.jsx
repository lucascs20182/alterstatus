import React, { useState } from 'react';
import alterstateLogo from '../../assets/alterstate_logo.png'
import Card from '../../components/Card/Card'

import clsx from 'clsx';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';
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
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import '../../fonts/Fonts.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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

  title: {
    width: "115px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    fontSize: "25px",
    color: "#094B89",
  },

  img: {
    width: "100px",
    height: "30px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginLeft: 60
  },

  input: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    width: 150,
    backgroundColor: '#D6D6D6',
    padding: '2px 6px',
  },

  iconButton: {
    padding: 5,
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

export default function Appbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [state, setState] = React.useState({
    left: false,
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
    <div className={classes.root}>
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
              <Typography variant="h1" noWrap>
                <h1 className={classes.title}>Alterstate</h1>
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <List className={classes.list}>
              
              <img src={alterstateLogo} className={classes.img} />
              <Divider />
              <h2>Criar sala</h2>
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
                  justifyContent: "center",
                }}
              >
                <Button>Logout</Button>
              </ListItem>
            </List>
            <Divider />
          </Drawer>
        </React.Fragment>
      ))}
      <main>
        <div className={classes.drawerHeader} />
        <Card />
      </main>
    </div>
  );
}
