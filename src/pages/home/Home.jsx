import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  appFrame: {
    zIndex: 1,
    overflow: "hidden",
    height: "100vh"
  },

  appBar: {
    position: "fixed",
    width: "100%",
    zIndex: 1200,
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 15
  },

  drawerPaper: {
    position: "fixed",
    width: drawerWidth,
    borderRadius: 3,
    top: theme.spacing(7), 
    height: `calc(100% - ${theme.spacing(8)}px)` 
  },

  drawerContent: {
    overflow: "auto",
    display: "flex",
    flexDirection: "column"
  },

  contentWrapper: {
    overflow: "auto",
    position: "fixed",
    top: theme.spacing(6),
    height: "calc(100% - 64px)", // Subtract width of header
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })

  },

  "content-left": {
    marginLeft: drawerWidth
  },

  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  content: {
    padding: theme.spacing(3)

  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={true}>
          <IconButton
            color="secondary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        elevation={0}
        PaperProps={{
          variant: "outlined"
        }}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main>
        <div 
          className={clsx(classes.contentWrapper, {
          [classes.contentShift]: open,
          [classes[`content-left`]]: open
          })} >
          <div className={classes.content}>
            <Typography variant="display4">
              {
                "You think water moves fast? You should see ice. Also this is a dumb filler sentence."
              }
            </Typography>
            <Typography variant="display4">
              {
                "You think water moves fast? You should see ice. Also this is a dumb filler sentence."
              }
            </Typography>
            <Typography variant="display4">
              {
                "You think water moves fast? You should see ice. Also this is a dumb filler sentence."
              }
            </Typography>
            <Typography variant="display4">
              {
                "You think water moves fast? You should see ice. Also this is a dumb filler sentence."
              }
            </Typography>
          </div>
        </div>

      </main>
    </div>
  );
}
