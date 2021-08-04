import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import '../styles.css';

import { removerSquad } from '../../../services/ApiSquad';

const useStyles = makeStyles((theme) => ({

  fecharJanela: {
    width: 25,
    height: 25,
    marginLeft: 260,
    marginTop: 5,
    color: 'secondary',
  },

  field: {
    marginBottom: 5,
  }

}));

export default function ModalDeletarSquad({ children, idSquad }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSim = () => {

    removerSquad(idSquad)
      .then((resposta) => {
        alert("Squad Excluido!!");

        history.go(0);
      })
      .catch((erro) => {
        alert("Erro ao remover o Squad!");
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

        <form className="form" style={{ width: "320px", height: "210px" }} onSubmit={e => e.preventDefault()} >
          <center>
            <CloseIcon className={classes.fecharJanela} onClick={handleClose} />
            <h3 style={{ color: "#f44336", textAlign: 'center', marginTop: -5 }}>Atenção!!!</h3>
            <h4>Você deseja deletar o Squad do Alterstate?</h4>
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