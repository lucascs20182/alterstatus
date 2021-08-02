import React, { useState, useEffect } from 'react'
import Online from '../../components/Status/StatusOnline';
import Offline from '../../components/Status/StatusOffline';
import Ausente from '../../components/Status/StatusAusente';
import Ocupado from '../../components/Status/StatusOcupado';
import ButtonCard from '../Button/ButtonMenu'
import user from '../../assets/user.svg'
import fonts from '../../fonts/Fonts.css'
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import Modal from '../Modal/Modal/Modal';
import { PostAdd } from '@material-ui/icons';
import ModalCriarSquad from '../Modal/ModalCriarSquad/ModalCriarSquad';

import {
  obterTokenDaStorage,
  salvarNomeUsuarioNaStorage
} from '../../utils/Storage';

import { obterDadosUsuario } from '../../services/ApiUsuario';
import { obterDadosSquad } from '../../services/ApiSquad';

import loadingImg from '../../assets/loading.gif';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexWrap: "wrap",
    margin: "auto",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
  },

  title: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },

  root: {
    display: 'table',
    textAlign: "center",
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "#D6D6D6",
    width: "170px",
    height: "180px",
    borderRadius: "2px",
    boxShadow: "0px 1px 1px 1px rgba(00, 00, 25, 0.3)",
  },

  info: {
    display: 'block',
    maxWidth: "200px",
    height: "200px",
  },

  avatar: {
    backgroundColor: "#094B89",
    clipPath: 'circle(26%)',
    padding: "7px",
    margin: 10,
  },


  user: {
    width: "40px",
    height: "38px",
  },


  nome: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 2,
    wordBreak: "break-word",
    fontSize: 13,
  },

  cargo: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 3,
    wordBreak: "break-word",
    fontSize: 13,
  },

  status: {
    textAlign: "center",
    marginBottom: 2,
    marginTop: 3,
    wordBreak: "break-word",
    fontSize: 13,
  },

  Button: {
    marginRight: theme.spacing(2),
  },
}))


export default function CardMembros(props) {
  const classes = useStyles();
  const [usuarioLogado, setUsuarioLogado] = useState({});
  const [squadAtual, setSquadAtual] = useState({});
  const [usuariosNaSquad, setUsuariosNaSquad] = useState([]);
  const [carregar, setCarregar] = useState(true);

  const usuariosFiltrados = usuariosNaSquad.filter(function(e) {
    return e.username.includes(props.pesquisa);
    
    // const regexp = new RegExp(props.pesquisa, "gi");
    // return e.username.match(regexp) !== null;
  })

  useEffect(() => {
    let [, idUsuario] = obterTokenDaStorage();

    obterDadosUsuario(idUsuario)
      .then((resposta) => {
        const idSquad = resposta.data.idSquad;

        setUsuarioLogado(resposta.data);

        salvarNomeUsuarioNaStorage(resposta.data.nome);

        obterDadosSquad(idSquad)
          .then((resposta) => {
            setSquadAtual(resposta.data);
            setUsuariosNaSquad(resposta.data.usuarios);
            setCarregar(false);
          })
          .catch((erro) => {
            alert("Erro! Verifique o console.");
            console.error(erro);
          })
      })
      .catch((erro) => {
        alert("Erro! Verifique o console.");
        console.error(erro);
        // setCarregar(false);
      })
  }, []);

  return (
    <div>
      {carregar ?
        ''
        :
        <div className={classes.title}>

          {/* icone de adicionar squad */}
          <ModalCriarSquad>
            <PostAdd color="secondary" />
          </ModalCriarSquad>

          {/* icone de adicionar usuario */}
          <Modal>
            <PersonAddIcon color="secondary" style={{ marginRight: 6 }} />
          </Modal>

          <h2 >
            {squadAtual.nome}
          </h2>

        </div>
      }

      <div className={classes.container}>
        {carregar ?
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={loadingImg} width={100} alt="loading..." />
          </div>
          :
          props.pesquisa.length === 0 ?
            usuariosNaSquad.map(usuario => (
              <div className={classes.root} key={usuario.id}>
                
                <div className={classes.info}>
                  <div>
                    <ButtonCard />
                    <h3 className={classes.avatar}><img className={classes.user} src={usuario.urlImagem} /></h3>
                  </div>
                  <h3 className={classes.nome}><Online />{usuario.username}</h3>
                  {console.log(usuario)}
                  {/* Objects are not valid as a React child */}
                  <p className={classes.cargo}>Bug no cargo ehhe</p>
                  <p className={classes.status}>{usuario.status}</p>
                </div>
              </div>
            ))
          :
            usuariosFiltrados.length === 0 ?
              'Nenhum usuário encontrado'
            :
              usuariosFiltrados.map(usuario => (
                <div className={classes.root} key={usuario.id}>
                  <div className={classes.info}>
                    <div>
                      <ButtonCard />
                      <h3 className={classes.avatar}><img className={classes.user} src={usuario.urlImagem} /></h3>
                    </div>
                    <h3 className={classes.nome}><Online />{usuario.username}</h3>
                    {console.log(usuario)}
                    {/* <p className={classes.cargo}>{usuario.cargo.nome}</p> */}
                    <p className={classes.cargo}>Bug no cargo ehhe</p>
                    <p className={classes.status}>{usuario.status}</p>
                  </div>
                </div>
              ))
        }
      </div>
    </div>
  );
}
