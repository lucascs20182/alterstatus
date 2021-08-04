import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import '../styles.css';

import { removerUsuario } from '../../../services/ApiUsuario';

const useStyles = makeStyles((theme) => ({

  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 260,
    marginTop: 5,
    color: '#094B89',
  },

  field: {
    marginBottom: 5,
  }

}));

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
        style={{ width: "100%" }}
      >

        <form className="form" style={{ width: "300px", height: "200px" }} onSubmit={e => e.preventDefault()} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ textAlign: 'center', marginTop: -5 }}>Deletar</h3>
            <h4>Você deseja deletar esse membro?</h4>
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