import React, { useState } from 'react';
import '../styles.css';

import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';

import { useStyles } from './Styles'

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
        className={classes.dialog}
      >

        <form className={classes.form} onSubmit={e => handleConfirmar(e)} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 className={classes.titleModal}>Editar Status</h3>
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

          <DialogActions className={classes.dialogActions}>
            <button className="buttonConfirmar" onClick={handleClose} >
              Confirmar
            </button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}