import React from 'react';
import alterstateLogo from '../../assets/alterstate_logo.png'

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

  img: {
    width: "120px",
    height: "30px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },

  search: {
    position: 'relative',
    borderRadius: 5,
    backgroundColor: alpha('#D6D6D6', 0.3),
    '&:hover': {
      backgroundColor: alpha('#D6D6D6', 0.5),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  searchIcon: {
    color: 'secondary',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 10),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const theme = useTheme();
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
                <img src={alterstateLogo} className={classes.img} />
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Buscar membros"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Toolbar>
          </AppBar>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <List className={classes.list}>
              <h2 style={{
                display: "flex",
                justifyContent: "center",

              }}>Criar Sala </h2>
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
                  fontFamily: "Poppins",
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
