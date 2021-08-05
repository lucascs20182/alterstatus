import React, { useState, useEffect } from 'react';
import AlertaSucesso from '../../Alert/AlertSucess'

import { useHistory } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';

import { useStyles } from './Styles';
import '../styles.css';

import { obterDadosSquad } from '../../../services/ApiSquad';
import { mudarCargoDoUsuario, removerCargo } from '../../../services/ApiUsuario';
import { obterSquadAtivaDaStorage } from '../../../utils/Storage';

export default function ModalListaDePapeis({ children, usuarioId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    cargo: '',
    name: 'hai',
  });

  const [cargos, setCargos] = useState(null);
  const [cargoSelecionado, setCargoSelecionado] = useState(-1);

  const handleChange = (event) => {
    const name = event.target.name;

    setState({
      ...state,
      [name]: event.target.value,
    });

    setCargoSelecionado(event.target.value);
  };

  const history = useHistory();

  const handleOpen = () => {
    obterCargos(obterSquadAtivaDaStorage());

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

  const handleConfirmar = (e) => {
    e.preventDefault();

    if (cargoSelecionado == -1) {
      removerCargo(usuarioId)
        .then((resposta) => {
          history.go(0);
        })
        .catch((erro) => {
          alert("Erro ao remover cargo! Verifique o console.");
          console.error(erro);
        })

      return;
    }

    mudarCargoDoUsuario(usuarioId, cargoSelecionado)
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
      <Tooltip title="Editar papel" arrow>
        <button className="buttonModal" type="submit" onClick={handleOpen}>
          {children}
        </button>
      </Tooltip>

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
              <h3 className={classes.titleModal}>Selecione o papel:</h3>
              <FormControl color="secondary" variant="outlined" className={classes.formControl} >
                <InputLabel >Papéis</InputLabel>
                <Select
                  native
                  value={state.cargo}
                  onChange={handleChange}
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