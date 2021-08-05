import React from 'react';
import '../styles.css';

import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';

import { criarSquad } from '../../../services/ApiSquad';
import { useStyles } from './Styles'

export default function ModalSquad({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nomeSquad, setNomeSquad] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCriar = (e) => {
    e.preventDefault();

    criarSquad(nomeSquad)
      .then((resposta) => {
        alert('Squad criado com sucesso!');

        history.go(0);
        // setCarregar(false);
      })
      .catch((erro) => {
        alert("Erro! Verifique o console.");
        console.error(erro);
        // setCarregar(false);
      });
  }

  return (
    <div>
      <Tooltip title="Criar squad" arrow>
        <button className="buttonModal" type="submit" onClick={handleOpen}>
          {children}
        </button>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >

        <form className={classes.form} onSubmit={e => handleCriar(e)} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 className={classes.titleModal}>Criar squad</h3>
            <TextField
              className={classes.field}
              name="Nome"
              label="Nome"
              variant="outlined"
              size="small"
              color="secondary"              
              onChange={(e) => setNomeSquad(e.target.value)}
            />

          </center>

          <DialogActions className={classes.dialogActions}>
            <button className="buttonConfirmar" onClick={handleClose} >
              Criar
            </button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}