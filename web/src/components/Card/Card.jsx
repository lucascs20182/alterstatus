import React, { useState, useEffect } from 'react'
import ModalCadastrar from '../Modal/ModalCadastrar/ModalCadastrar';
import ModalCriarPapel from '../Modal/ModalPapel/ModalPapel';
import ModalMudarNomeDoSquad from '../Modal/ModalMudarNomeDoSquad/ModalMudarNomeDoSquad'

import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import ButtonCard from '../Button/ButtonMenu';
import { PostAdd } from '@material-ui/icons';
import fonts from '../../fonts/Fonts.css'
import {
  obterTokenDaStorage,
  salvarSquadAtivaNaStorage
} from '../../utils/Storage';

import { obterDadosUsuario } from '../../services/ApiUsuario';
import { obterDadosSquad } from '../../services/ApiSquad';


import { useStyles } from './styles'

export default function CardMembros(props) {
  const classes = useStyles();
  const [usuarioLogado, setUsuarioLogado] = useState({});
  const [squadAtual, setSquadAtual] = useState({});
  const [usuariosNaSquad, setUsuariosNaSquad] = useState([]);
  const [carregar, setCarregar] = useState(true);

  const usuariosFiltrados = usuariosNaSquad.filter(function (e) {
    const regexp = new RegExp(props.pesquisa, 'gi');
    return e.nome.match(regexp) !== null || e.username.match(regexp) !== null;
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
            salvarSquadAtivaNaStorage(idSquad);
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
        <div>
          <div className={classes.title}>
            {/* icone de adicionar squad */}
            <h2 className={classes.squadTitle} >
              {squadAtual.nome}
            </h2>

          </div>

          <div className={classes.buttons}>
            <ModalCriarPapel >
              <PostAdd color="secondary" />
            </ModalCriarPapel>

            {/* icone de adicionar usuario */}
            <ModalCadastrar>
              <PersonAddIcon color="secondary" style={{ marginRight: 5, }} />
            </ModalCadastrar>

            <ModalMudarNomeDoSquad>
              <EditIcon color="secondary" style={{ marginRight: 5, fontSize: 22 }} />
            </ModalMudarNomeDoSquad>

          </div>
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
                    <ButtonCard usuarioId={usuario.id} />
                    <h3 className={classes.avatar}><img className={classes.user} src={usuario.urlImagem} alt="Imagem dos membros" /></h3>
                  </div>
                  <h2 className={classes.nome}>{usuario.nome}</h2>
                  {/* {console.log(usuario)} */}
                  {/* Objects are not valid as a React child */}
                  {usuario.cargo != null ?
                    <>
                      <h5 className={classes.subtitle}>Papel:</h5>
                      <p className={classes.cargo}>{usuario.cargo.nome}</p>
                    </>
                    :
                    <>
                      <h5 className={classes.subtitle}>Papel:</h5>
                      <p className={classes.subtitle}>Cargo indefinido</p>
                    </>
                  }

                  {/* <p className={classes.cargo}>Bug no cargo ehhe</p> */}
                  <h5 className={classes.subtitle}>Status:</h5>
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
                      <ButtonCard usuarioId={usuario.id} />
                      <h3 className={classes.avatar}><img className={classes.user} src={usuario.urlImagem} alt="Imagem dos membros" /></h3>
                    </div>
                    <h2 className={classes.nome}>{usuario.nome}</h2>
                    {/* {console.log(usuario)} */}
                    {usuario.cargo != null ?
                      <>
                        <h5 className={classes.subtitle}>Papel:</h5>
                        <p className={classes.cargo}>{usuario.cargo.nome}</p>
                      </>
                      :
                      <>
                        <h5 className={classes.subtitle}>Papel:</h5>
                        <p className={classes.cargo}>Cargo indefinido</p>
                      </>
                    }
                    {/* <p className={classes.cargo}>Bug no cargo ehhe</p> */}
                    <h5 className={classes.subtitle}>Status:</h5>
                    <p className={classes.status}>{usuario.status}</p>
                  </div>
                </div>
              ))
        }
      </div>
    </div>
  );
}
