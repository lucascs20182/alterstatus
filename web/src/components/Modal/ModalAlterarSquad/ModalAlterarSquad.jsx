import React, { useState} from 'react';

import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { obterSquads, obterDadosSquad } from '../../../services/ApiSquad';
import { mudarUsuarioDeSquad } from '../../../services/ApiUsuario';
import { obterSquadAtivaDaStorage } from '../../../utils/Storage';

import { useStyles } from './Styles';
import '../styles.css';

export default function ModalDesignarPapel({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    squad: '',
    name: 'hai',
  });
  const [stateUser, setStateUser] = React.useState({
    usuario: '',
    name: 'hai',
  });

  const [squads, setSquads] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(-1);
  const [squadSelecionado, setSquadSelecionado] = useState(-1);

  const handleChangeSquad = (event) => {
    const name = event.target.name;

    setState({
      ...state,
      [name]: event.target.value,
    });

    setSquadSelecionado(event.target.value);
  };

  const handleChangeUsuario = (event) =>{
    const name = event.target.name;

    setStateUser({
      ...stateUser,
      [name]: event.target.value,
    });

    setUsuarioSelecionado(event.target.value);
  }

  const history = useHistory();

  const handleOpen = () => {
    obterEquipes();
    obterUsuarios(obterSquadAtivaDaStorage());

    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  const obterEquipes = () => {

    obterSquads()
      .then((resposta) => {
        setSquads(resposta.data);
      })
      .catch((erro) => {
        alert("Erro ao obter squad! Verifique o console.");
        console.error(erro);
      })

  }

  const obterUsuarios = (idSquad) => {

    obterDadosSquad(idSquad)
      .then((resposta) => {
        setUsuarios(resposta.data.usuarios)
      })
      .catch((erro) => {
        alert("Erro ao obter o equipe! Verifique o console.");
        console.error(erro);
      })
  }


  const handleConfirmar = (e) => {
    e.preventDefault();

    if (squadSelecionado == -1) {
          alert("Nenhum squad selecionado");
      return;
    }

    mudarUsuarioDeSquad(usuarioSelecionado, squadSelecionado)
      .then((resposta) => {
        history.go(0);
      })
      .catch((erro) => {
        alert("Erro ao alterar usuario de squad! Verifique o console.");
        console.error(erro);
      })
   }
  return (
    <div>
        <Button disableElevation className="buttonModal" type="submit" style={{ width: "100%", textTransform: 'none', }} onClick={handleOpen}>
          {children}
        </Button>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >

          <form className={classes.form} onSubmit={e => handleConfirmar(e)}>
            <center>
              <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
              <h3 className={classes.titleModal}>Mudar membro de Equipe:</h3>
              <FormControl color="secondary" variant="outlined" className={classes.formControl} >
                <InputLabel >Equipe</InputLabel>
                <Select
                  native
<<<<<<< HEAD
                  value={state.cargo}
                  onChange={handleChange}
                  label="Equipe"
=======
                  value={state.squad}
                  onChange={handleChangeSquad}
                  label="Squad"
>>>>>>> f5d900206ea5c7bf58047ec1bc3147c837b019ad
                  inputProps={{
                    name: 'squad',
                  }}
                >
                  <option aria-label="None" value={-1}>Sem equipe</option>

                  {squads ?
                    squads.map(squad => (
                      <option value={squad.id}>{squad.nome}</option>
                    ))
                    :
                    ''
                  }
                </Select>
              </FormControl>
              <FormControl color="secondary" variant="outlined" className={classes.formControl} >
                <InputLabel>Usuário</InputLabel>
                <Select
                  native
                  value={stateUser.usuario}
                  onChange={handleChangeUsuario}
                  label="Nome"
                  inputProps={{
                    name: 'usuario',
                  }}
                >
                  <option aria-label="None" value={-1}>Sem usuário</option>

                  {usuarios ?
                    usuarios.map(usuario => (
                      <option value={usuario.id}>{usuario.nome}</option>
                    ))
                    :
                    ''
                  }
                </Select>
              </FormControl>
            </center>

            <DialogActions className={classes.dialogActions}>
              <button className="buttonConfirmar" onClick={handleClose} >
                Confirmar
              </button>
            </DialogActions>
          </form>
        </Dialog>
      </div>

    </div>
  );
}
