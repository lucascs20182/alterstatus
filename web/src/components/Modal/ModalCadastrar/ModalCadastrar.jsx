import React from 'react';
import fecharJanela from '../../../assets/fecharJanela.png';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import '../styles.css';
import '../../../styles/login.css'

const useStyles = makeStyles((theme) => ({
  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 235,
    marginTop: 5,
    color: '#094B89',
  },

  field: {
    marginBottom: 15,
  }

}));

export default function SimpleModal({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Cadastrar membro" arrow>
        <button className="buttonModal" color="secondary" onClick={handleClickOpen}>
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

        <form className="form" style={{ width: "270px", height: "370px" }} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5}}>Cadastro</h3>
            <TextField
              className={classes.field}
              name="Nome"
              label="Nome"
              variant="outlined"
              size="small"
              color="secondary"
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              className={classes.field}
              name="Username"
              label="Username"
              variant="outlined"
              size="small"
              color="secondary"
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              className={classes.field}
              id="standard-password-input"
              name="Password"
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              color="secondary"
              onChange={(e) => setSenha(e.target.value)}
            />

            <TextField
              name="Status (Opcional)"
              label="Status (Opcional)"
              variant="outlined"
              type="string"
              size="small"
              color="secondary"
              onChange={(e) => setSenha(e.target.value)}
            />

          </center>

          <DialogActions style={{ alignItems: 'center', justifyContent: 'center' }}>
            <button className="buttonConfirmar" onClick={handleClose} >
              Cadastrar
            </button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}