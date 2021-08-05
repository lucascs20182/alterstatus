import React, { useState } from 'react';
import '../styles.css';

import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';


import { editarStatus } from '../../../services/ApiUsuario'

const useStyles = makeStyles((theme) => ({

  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 235,
    marginTop: 5,
    color: 'secondary',
  },

  field: {
    marginBottom: 5,
  }

}));

export default function ModalStatus({ children, usuarioId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [status, setStatus] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmar = e => {
    e.preventDefault();

    console.log(status);
    
    editarStatus(status, usuarioId)
    .then((resposta)=> {
      history.go(0)

    })
    .catch( erro => { 
      console.log(erro);
      alert("Erro ao alterar status!")

      
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

        <form className="form" style={{ width: "270px", height: "200px" }} onSubmit={e => handleConfirmar(e)} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5 }}>Editar Status</h3>
            <TextField
              className={classes.field}
              name="Status"
              label="Status"
              variant="outlined"
              size="small"
              color="secondary"
              onChange={(e) => setStatus(e.target.value)}
            />

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