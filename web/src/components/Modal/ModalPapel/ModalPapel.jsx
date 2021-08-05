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

  dialog: {
    width: "100%"
  },

  field: {
    marginBottom: 5,
  },

  form: {
    width: "270px", 
    height: "200px"
  },

  titleModal: {
    textAlign: 'center', 
    marginTop: -5
  },

  dialogActions: {
    alignItems: 'center', 
    justifyContent: 'center'
  },

}));

export default function ModalCriarPapel({ children }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState(false);

  const [novoCargo, setNovoCargo] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCadastrar = () => {
    setSuccess(false);
    cadastrarCargo(novoCargo, obterSquadAtivaDaStorage())

      .then((resposta) => {
        setOpen(false);
        setSuccess(true);
      })
      .catch((erro) => {
        alert("Erro ao remover usuário! Verifique o console.");
        console.error(erro);
      })
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Criar papel" arrow>
        <button className="buttonModal" type="submit" onClick={handleOpen}>
          {children}
        </button>
      </Tooltip>

      <div>
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
              <h3 className={classes.titleModal}>Criar papel</h3>
              <TextField
                className={classes.field}
                name="Papel"
                label="Papel"
                variant="outlined"
                size="small"
                color="secondary"
                onChange={(e) => setNovoCargo(e.target.value)}
              />

            </center>

            <DialogActions className={classes.dialogActions}>
              <button className="buttonConfirmar" onClick={handleCadastrar} >
                Cadastrar
              </button>
            </DialogActions>
          </form>
        </Dialog>
      </div>

      {success ?

        <AlertaSucesso>Cadastro realizado com sucesso!</AlertaSucesso>

        :

        ''
      }
    </div>
  );
}