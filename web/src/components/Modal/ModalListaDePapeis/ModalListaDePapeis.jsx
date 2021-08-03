import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import '../styles.css';

import { obterDadosSquad } from '../../../services/ApiSquad';
import { mudarCargoDoUsuario, removerCargo } from '../../../services/ApiUsuario';
import { obterSquadAtivaDaStorage } from '../../../utils/Storage';

const useStyles = makeStyles((theme) => ({
  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 235,
    marginTop: 5,
    color: '#094B89',
  },

  field: {
    marginBottom: 5,
  }
}));

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
    // chama requisição aqui

    setOpen(false);
  };

  const obterCargos = (idSquad) => {
    obterDadosSquad(idSquad)
      .then((resposta) => {
        setCargos(resposta.data.cargos);
      })
      .catch((erro) => {
        alert("Erro ao obter squad! Verifique o console.");
        console.error(erro);
      })
  }

  const handleConfirmar = (e) => {
    e.preventDefault();

    if(cargoSelecionado == -1) {

      // problema de cors
      removerCargo(usuarioId)
        .then((resposta) => {
          alert("Cargo removido!");
          // history.go(0);
          history.push('/home');
        })
        .catch((erro) => {
          alert("Erro ao remover cargo! Verifique o console.");
          console.error(erro);
        })
      
      return;
    }

    mudarCargoDoUsuario(usuarioId, cargoSelecionado)
      .then((resposta) => {
        // alert("Cargo alterado!");
        history.go(0);        
      })
      .catch((erro) => {
        alert("Erro ao alterar cargo! Verifique o console.");
        console.error(erro);
      })
  }

  return (
    <div>

      <button className="buttonModal" type="submit" onClick={handleOpen}>
        {children}
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100%" }}
      >

        <form className="form" style={{ width: "270px", height: "210px" }} onSubmit={e => handleConfirmar(e)}>
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5 }}>Selecione o papel:</h3>
            <FormControl color="secondary" variant="outlined" className={classes.formControl} style={{ width: "220px" }}>
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
                
                { cargos ?
                  cargos.map(cargo => (
                    <option value={cargo.id}>{cargo.nome}</option>
                  ))
                :
                  ''
                }
              </Select>
            </FormControl>
          </center>

          <DialogActions style={{ alignItems: 'center', justifyContent: 'center' }}>
            <button className="buttonConfirmar" onClick={handleClose} >
              Confirmar
            </button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}