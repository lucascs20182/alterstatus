import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: "#094B89",
  },
  
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#D6D6D6', 0.40),
    '&:hover': {
      backgroundColor: alpha('#D6D6D6', 0.70),
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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '35ch',
    },

  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  list: {
    width: 250,
  },

  fullList: {
    width: 'auto',
  },

  equipes: {
    marginBottom: 5, 
    marginTop: 5, 
    backgroundColor: "#094B89"
  },

  logoutContainer: {
    marginTop: "auto",
    paddingBottom: "0",
    position: "fixed",
    width: drawerWidth,
    bottom: 0
  },

  img: {
    width: "100px",
    height: "30px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginLeft: 68,
    paddingBottom: 10,
  },

  createSquad: {
    alignItems: "center",
    flex: 1,
    display: "flex",
    marginLeft: 10,
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
    justifyContent: "center",
    padding: theme.spacing(3),
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));