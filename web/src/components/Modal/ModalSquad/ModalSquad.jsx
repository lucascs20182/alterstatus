import React from 'react';
import '../styles.css';

import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';

import { criarSquad } from '../../../services/ApiSquad';

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
        style={{ width: "100%" }}
      >

        <form className="form" style={{ width: "270px", height: "200px" }} onSubmit={e => handleCriar(e)} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5 }}>Criar squad</h3>
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

          <DialogActions style={{ alignItems: 'center', justifyContent: 'center' }}>
            <button className="buttonConfirmar" onClick={handleClose} >
              Criar
            </button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}