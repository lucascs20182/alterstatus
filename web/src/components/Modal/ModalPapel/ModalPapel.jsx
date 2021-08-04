import React, { useState } from 'react';
import '../styles.css';

import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';

import { obterSquadAtivaDaStorage } from '../../../utils/Storage';
import { cadastrarCargo } from '../../../services/ApiCargo';

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

export default function ModalCriarPapel({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [novoCargo, setNovoCargo] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCadastrar = () => {
    cadastrarCargo(novoCargo, obterSquadAtivaDaStorage())
    .then((resposta) => {
      alert('Novo cargo adicionado!');
      
      setOpen(false);
      // history.go(0);
    })
    .catch((erro) => {
      alert("Erro ao remover usuário! Verifique o console.");
      console.error(erro);
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Criar papel" arrow>
        <button className="buttonModal" type="submit" onClick={handleOpen}>
          {children}
        </button>
      </Tooltip>


      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100%" }}
      >

        <form className="form" style={{ width: "270px", height: "200px" }} onSubmit={e => e.preventDefault()} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5}}>Criar papel</h3>
            <TextField
              className={classes.field}
              name="Papel"
              label="Papel"
              variant="outlined"
              size="small"
              color="secondary"
              onChange={(e) => setNovoCargo(e.target.value)}
            />

          </center>

          <DialogActions style={{ alignItems: 'center', justifyContent: 'center' }}>
            <button className="buttonConfirmar" onClick={handleCadastrar} >
              Cadastrar
            </button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}