import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import '../styles.css';

const useStyles = makeStyles((theme) => ({

  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 255,
    marginTop: 5,
    color: '#094B89',
  },

  field: {
    marginBottom: 5,
  }

}));

export default function ModalTrocarSquad({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSim = () => {
    console.log('bonjour');

    handleClose();
  }

  return (
    <div>

      <Button disableElevation  className="buttonModal" style={{ width: "100%", textTransform: 'none', }} onClick={handleOpen}>
        {children}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100%" }}
      >

        <form className="form" style={{ width: "290px", height: "180px" }} onSubmit={e => e.preventDefault()}>
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5 }}>Trocar de Squad</h3>
            <h4>Você deseja mudar de squad?</h4>
          </center>

          <DialogActions style={{ alignItems: 'center', justifyContent: 'center', marginTop: -20 }}>
            <button className="buttonDeletar" onClick={handleSim} >
              Sim
            </button>
            <button className="buttonConfirmar" onClick={handleClose} >
              Não
            </button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
}