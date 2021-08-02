import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import '../styles.css';

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

        <form className="form" style={{ width: "270px", height: "200px" }} >
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
              onChange={(e) => setUsername(e.target.value)}
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