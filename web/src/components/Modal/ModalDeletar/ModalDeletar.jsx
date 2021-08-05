import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';

import { useStyles } from './Styles'
import '../styles.css';

import { removerUsuario } from '../../../services/ApiUsuario';


export default function ModalDeletar({ children, usuarioId }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSim = () => {
    // problema de cors
    removerUsuario(usuarioId)
    .then((resposta) => {
      // alert("Usuário removido!");
      
      // history.push('/home');
      history.go(0);
    })
    .catch((erro) => {
      alert("Erro ao remover usuário! Verifique o console.");
      console.error(erro);
    })
    
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
        className={classes.dialog}
      >

        <form className={classes.form} onSubmit={e => e.preventDefault()} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 className={classes.titleModal}>Deletar</h3>
            <h4 className={classes.subtitleModal}>Você deseja deletar esse membro?</h4>
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