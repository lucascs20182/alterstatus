import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import { useStyles } from './Styles'
import '../styles.css';

import { mudarUsuarioDeSquad } from '../../../services/ApiUsuario';
import { obterTokenDaStorage } from '../../../utils/Storage';

export default function ModalTrocarSquad({ children, idSquad }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSim = () => {
    const [, idUsuario] = obterTokenDaStorage();
    console.log(idUsuario, idSquad);

    mudarUsuarioDeSquad(idUsuario, idSquad)
      .then((resposta) => {
        history.go(0);
        // console.log(resposta);
      })
      .catch((erro) => {
        alert("Erro ao alterar equipe! Verifique o console.");
        console.error(erro);
      })

    // handleClose();
}

return (
  <div>

    <Button disableElevation className="buttonModal" style={{ width: "100%", textTransform: 'none', }} onClick={handleOpen}>
      {children}
    </Button>

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.dialog}
    >

      <form className={classes.form} onSubmit={e => e.preventDefault()}>
        <center>
          <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
          <h3 className={classes.titleModal}>Trocar de equipe</h3>
          <h4 className={classes.subtitleModal}>Você deseja mudar equipe?</h4>
        </center>

        <DialogActions className={classes.dialogActions}>
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