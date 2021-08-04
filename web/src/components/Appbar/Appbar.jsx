import React, { useState, useEffect } from 'react';
import CardMembros from '../Card/Card'
import ModalSquad from '../Modal/ModalSquad/ModalSquad';
import ModalPerfil from '../Modal/ModalPerfil/ModalPerfil';
import TreeView from '../TreeView/TreeView.jsx';

import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import { AddCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import {
  removerAutenticacao,
  obterTokenDaStorage
} from '../../utils/Storage';

import { obterDadosUsuario } from '../../services/ApiUsuario';

import { obterSquads } from '../../services/ApiSquad';

import { useHistory } from 'react-router-dom';

import { useStyles } from './styles'

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [state, setState] = useState({
    left: false,
  });
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [carregar, setCarregar] = useState(false);

  const [nomesSquads, setNomesSquads] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setCarregar(true);

    let [, idUsuario] = obterTokenDaStorage();

    obterDadosUsuario(idUsuario)
      .then((resposta) => {
        setNomeUsuario(resposta.data.nome);

        obterSquads()
          .then((resposta) => {            
            const nomes = [];

            resposta.data.filter(value => {
              nomes.push(value.nome);
            });

            setNomesSquads(nomes);
            setCarregar(false);
          })
          .catch((erro) => {
            alert("Erro! Verifique o console.");
            console.error(erro);
            setCarregar(false);
          });
        // setCarregar(false);
      })
      .catch((erro) => {
        alert("Erro! Verifique o console.");
        console.error(erro);
        setCarregar(false);
      })
  }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSair = () => {
    removerAutenticacao();

    handleMenuClose();

    history.push('/login');
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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

      <MenuItem>
        <MenuItem onClick={handleMenuClose} style={{ width: "100%", }}>
          <ModalPerfil> Perfil </ModalPerfil>
        </MenuItem>

      </MenuItem>
      <MenuItem onClick={handleSair} style={{ display: 'flex', justifyContent: 'center', width: "100%", textDecoration: "none" }}>
        Sair
      </MenuItem>
    </Menu>

  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <ModalPerfil>
          <MenuItem onClick={handleMobileMenuClose} style={{ width: "100%", }}>
            Perfil
          </MenuItem>
        </ModalPerfil>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose} style={{ display: 'flex', justifyContent: 'center', width: "100%", textDecoration: "none" }}>
        Sair
      </MenuItem>
    </Menu>
  );

  // Menu de squad, usuarios e criar equipe do lado direito
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
                {/* menu de busca */}
                <InputBase
                  placeholder="Buscar membros..."
                  onChange={e => setPesquisa(e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'Buscar membros...' }}
                />
              </div>
              <div className={classes.grow} />

              <div className={classes.sectionDesktop}>
                {carregar ?
                  ''
                  :
                  <h3>{`Olá, ${nomeUsuario}`}</h3>
                }

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
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="secondary"
                >
                  <MoreIcon />
                </IconButton>
              </div>

            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}

          <Drawer anchor="left" open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
            <List className={classes.list}>
              <Typography className={classes.subtitle}>
                Alterstate
              </Typography>
              <Divider />
              <h3 className={classes.createSquad}>
                Criar equipe
                <ModalSquad>
                  <AddCircle
                    color="secondary"
                    style={{
                      height: 28,
                      width: 28,
                      height: '100%',
                      marginTop: 8,
                    }}
                  />
                </ModalSquad>
              </h3>

              <Divider />
            </List>
            {carregar ? 
              ''
            :
              <TreeView squadsCadastradas={nomesSquads} />
            }
          </Drawer>
          <main>
            <div className={classes.drawerHeader} />
            <CardMembros pesquisa={pesquisa} />
          </main>
        </React.Fragment>
      ))}

    </div>
  )
}

