import React, { useState} from 'react';

import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { obterDadosSquad } from '../../../services/ApiSquad';
import { mudarCargoDoUsuario, removerCargo } from '../../../services/ApiUsuario';
import { obterSquadAtivaDaStorage } from '../../../utils/Storage';

import { useStyles } from './Styles';
import '../styles.css';

export default function ModalDesignarPapel({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    cargo: '',
    name: 'hai',
  });
  const [stateUser, setStateUser] = React.useState({
    usuario: '',
    name: 'hai',
  });

  const [cargos, setCargos] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(-1);
  const [cargoSelecionado, setCargoSelecionado] = useState(-1);

  const handleChangeCargo = (event) => {
    const name = event.target.name;

    setState({
      ...state,
      [name]: event.target.value,
    });

    setCargoSelecionado(event.target.value);
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
    obterCargos(obterSquadAtivaDaStorage());
    obterUsuarios(obterSquadAtivaDaStorage());

    setOpen(true);
  };

  const handleClose = () => {

    setOpen(false);
  };

  const obterCargos = (idSquad) => {

    obterDadosSquad(idSquad)
      .then((resposta) => {
        setCargos(resposta.data.cargos);
      })
      .catch((erro) => {
        alert("Erro ao obter equipe! Verifique o console.");
        console.error(erro);
      })
  }

  const obterUsuarios = (idSquad) => {

    obterDadosSquad(idSquad)
      .then((resposta) => {
        setUsuarios(resposta.data.usuarios)
      })
      .catch((erro) => {
        alert("Erro ao obter squad! Verifique o console.");
        console.error(erro);
      })
  }

  const handleConfirmar = (e) => {
    e.preventDefault();

    if (cargoSelecionado == -1) {
      removerCargo(usuarioSelecionado)
        .then((resposta) => {
          history.go(0);
        })
        .catch((erro) => {
          alert("Erro ao remover cargo! Verifique o console.");
          console.error(erro);
        })

      return;
    }

    mudarCargoDoUsuario(usuarioSelecionado, cargoSelecionado)
      .then((resposta) => {
        history.go(0);
      })
      .catch((erro) => {
        alert("Erro ao alterar cargo! Verifique o console.");
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
              <h3 className={classes.titleModal}>Designar papel:</h3>
              <FormControl color="secondary" variant="outlined" className={classes.formControl} >
                <InputLabel >Papel:</InputLabel>
                <Select
                  native
                  value={state.cargo}
                  onChange={handleChangeCargo}
                  label="Papéis"
                  inputProps={{
                    name: 'cargo',
                  }}
                >
                  <option aria-label="None" value={-1}>Sem cargo</option>

                  {cargos ?
                    cargos.map(cargo => (
                      <option value={cargo.id}>{cargo.nome}</option>
                    ))
                    :
                    ''
                  }
                </Select>
              </FormControl>
              <FormControl color="secondary" variant="outlined" className={classes.formControl} >
                <InputLabel >Membro:</InputLabel>
                <Select
                  native
                  value={stateUser.usuario}
                  onChange={handleChangeUsuario}
                  label="Nome"
                  inputProps={{
                    name: 'usuario',
                  }}
                >
                  <option aria-label="None" value={-1}>Sem membro</option>

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