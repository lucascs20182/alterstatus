import React from 'react';
import CardMembros from '../Card/Card'
import alterstateLogo from '../../assets/alterstate_logo.png'
import { useStyles } from './styles'

import { alpha, makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import GroupIcon from '@material-ui/icons/Group';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import { AddCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import ModalSquad from '../Modal/ModalCargo/ModalCargo';
import ModalPerfil from '../Modal/ModalPerfil/ModalPerfil';

import { removerAutenticacao } from '../../utils/Storage';

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSair = () => {
    removerAutenticacao();

    handleMenuClose();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      style={{ marginTop: 34, }}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <ModalPerfil><MenuItem style={{ width: "100px" }}>Perfil</MenuItem> </ModalPerfil>
      <Link to="/" className="link" style={{ color: "#000", textDecoration: "none" }}>
        <MenuItem onClick={handleSair} style={{ width: "100px", }}>
          Sair
        </MenuItem>
      </Link>
    </Menu>
  );


  return (
    <div className={classes.grow}>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <AppBar position="fixed" elevation={1}>
            <Toolbar>
              <IconButton
                edge="start"
                color="secondary"
                aria-label="open drawer"
                onClick={toggleDrawer(anchor, true)}
                anchor="left"
              >
                <MenuIcon />
              </IconButton>
              <Typography className={classes.title}>
                Alterstate
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Buscar membros..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'Buscar membros...' }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <h3>Olá, Guilherme</h3>

                <IconButton
                  edge="end"
                  aria-label="user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="secondary"
                >
                  <AccountCircle style={{
                    width: "30px",
                    height: "30px",
                    color: '#094B89'
                  }} />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-haspopup="true"
                  color="secondary"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
            <List className={classes.list}>
              <Typography className={classes.subtitle}>
                Alterstate
              </Typography>
              <Divider />
              <h3 className={classes.createSquad}>
                Criar sala
                <ModalSquad>
                  <IconButton
                    aria-label="show more"
                    aria-haspopup="true"
                    color="secondary"
                  >
                    <AddCircle
                      style={{
                        height: 28,
                        width: 28,
                        marginBottom: 30
                      }}
                    />

                  </IconButton>
                </ModalSquad>
              </h3>

              <Divider />
              {['Pack', 'NFStock', 'Bimer', 'Shop'].map((text) => (
                <ListItem button key={text} className={classes.equipes} >
                  <ListItemIcon ><GroupIcon color="primary" /></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <h3 className={classes.createSquad}>
                Membros
              </h3>
            </List>

          </Drawer>
          <main>
            <div className={classes.drawerHeader} />
            <CardMembros />
          </main>

          {renderMenu}
        </React.Fragment>
      ))}
    </div>
  )
}
