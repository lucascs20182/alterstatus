import React, { useState } from 'react';

import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';

import { obterSquadAtivaDaStorage } from '../../../utils/Storage';
import { cadastrarCargo } from '../../../services/ApiCargo';
import '../styles.css';
import AlertaSucesso from '../../Alert/AlertSucess';

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

export default function ModalCriarPapel({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Alterar nome da Equipe" arrow>
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

          <form className="form" style={{ width: "280px", height: "210px" }} onSubmit={e => e.preventDefault()} >
            <center>
              <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
              <h3 style={{ textAlign: 'center', marginTop: 0 }}>Alterar nome da equipe</h3>
              <TextField
                className={classes.field}
                name="Novo nome"
                label="Novo nome"
                variant="outlined"
                size="small"
                color="secondary"
              />

            </center>

            <DialogActions style={{ alignItems: 'center', justifyContent: 'center' }}>
              <button className="buttonConfirmar" >
                Alterar
              </button>
            </DialogActions>
          </form>
        </Dialog>
    </div>
  );
}