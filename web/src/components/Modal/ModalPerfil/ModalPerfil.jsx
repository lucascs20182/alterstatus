import React from 'react';
import '../styles.css';
import '../../../styles/login.css';

import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhoto from '@material-ui/icons/AddAPhoto';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';

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
  },
  
  avatar: {
    clipPath: 'circle(26%)',
    height: 70,
    marginBottom: 10
  },

  input: {
    display: 'none',
  },

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



        <form className="form" style={{ width: "270px", height: "450px" }} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5 }}>Perfil</h3>
            <h3 className={classes.avatar}><img className={classes.user} /></h3>

            {/* --------Botão camera-------- */}
              
            <div className={classes.root}>
              
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
              <IconButton color="secondary" aria-label="upload picture" component="span">
                <AddAPhoto />
              </IconButton>
            </label>
            </div>
            {/* -------------lembrar de reposicionar quando tiver a foto no menu-------------- */}

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
              name="Papel"
              label="Papel"
              variant="outlined"
              size="small"
              color="secondary"
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              name="Status"
              label="Status"
              variant="outlined"
              type="string"
              size="small"
              color="secondary"
              onChange={(e) => setSenha(e.target.value)}
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