import React, { useState, useEffect } from 'react'
import { useStyles } from './styles'
import Online from '../../components/Status/StatusOnline';
import ButtonCard from '../Button/ButtonMenu'
import user from '../../assets/user.svg'
import fonts from '../../fonts/Fonts.css'
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import ModalCadastrar from '../Modal/ModalCadastrar/ModalCadastrar';
import { PostAdd } from '@material-ui/icons';
import ModalCriarPapel from '../Modal/ModalPapel/ModalPapel';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  obterTokenDaStorage
} from '../../utils/Storage';

import { obterDadosUsuario } from '../../services/ApiUsuario';
import { obterDadosSquad } from '../../services/ApiSquad';

export default function CardMembros(props) {
  const classes = useStyles();
  const [usuarioLogado, setUsuarioLogado] = useState({});
  const [squadAtual, setSquadAtual] = useState({});
  const [usuariosNaSquad, setUsuariosNaSquad] = useState([]);
  const [carregar, setCarregar] = useState(true);

  const usuariosFiltrados = usuariosNaSquad.filter(function (e) {
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

        obterDadosSquad(idSquad)
          .then((resposta) => {
            // console.log(resposta.data);
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
          <ModalCriarPapel >
            <PostAdd color="secondary" />
          </ModalCriarPapel>

          {/* icone de adicionar usuario */}
          <ModalCadastrar>
            <PersonAddIcon color="secondary" style={{ marginRight: 5, }} />
          </ModalCadastrar>
          <h2 style={{ marginRight: 5, }} >
            Pack
          </h2>

        </div>
      }

      <div className={classes.container}>
        {carregar ?
          <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
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
                  <h3 className={classes.nome}>{usuario.username}</h3>
                  {/* {console.log(usuario)} */}
                  {/* Objects are not valid as a React child */}
                  {usuario.cargo != null ?
                    <p className={classes.cargo}>{usuario.cargo.nome}</p>
                    :
                    <p className={classes.cargo}>Cargo indefinido</p>
                  }

                  {/* <p className={classes.cargo}>Bug no cargo ehhe</p> */}
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
                    {/* {console.log(usuario)} */}
                    {usuario.cargo != null ?
                      <p className={classes.cargo}>{usuario.cargo.nome}</p>
                      :
                      <p className={classes.cargo}>Cargo indefinido</p>
                    }
                    {/* <p className={classes.cargo}>Bug no cargo ehhe</p> */}
                    <p className={classes.status}>{usuario.status}</p>
                  </div>
                </div>
              ))
        }
      </div>
    </div>
  );
}
